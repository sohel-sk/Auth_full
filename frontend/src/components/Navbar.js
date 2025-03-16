import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`${apiUrl}/api/user/data`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, // Send token
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data); // Set user state
                    } else {
                        console.error("Failed to fetch user data");
                    }

                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUserData();
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        setIsAuthenticated(false);
        setUser(null);
        navigate("/login"); // Redirect to login
    };

    return (
        <nav className="bg-gray-100 text-gray-800 p-4 flex justify-between items-center rounded-md shadow-md">
            <div className="flex items-center gap-4">
                <div className="text-xl font-bold">SS Auth</div>
                {isAuthenticated && user && (
                    <span className="border-0 rounded-full px-3 py-1 bg-cyan-500 text-white flex items-center">
                        {user.name} {/* User name next to SS Auth */}
                    </span>
                )}
            </div>
        
            <div className="flex gap-4">
                {isAuthenticated ? (
                    <>
                        <Link to="/reset-password" className="border-0 text-white rounded-full px-3 py-1 bg-cyan-500 flex items-center">
                            Reset Password
                        </Link>
                        <button onClick={handleLogout} className="border-0 text-white rounded-full px-3 py-1 bg-red-500 flex items-center">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="border-0 text-white rounded-full px-4 py-1 bg-cyan-500 flex items-center">
                            Login
                        </Link>
                        <Link to="/register" className="border-0 text-white rounded-full px-4 py-1 bg-cyan-500 flex items-center">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;