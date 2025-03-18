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
        <nav className="flex  items-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
            <div className="min-w-full p-4 flex  justify-between items-center bg-white bg-opacity-20 backdrop-blur-md shadow-md">
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold">SS Auth</div>
                    {isAuthenticated && user && (
                        <span className="px-4 py-2 bg-white text-blue-500 rounded-full shadow hover:bg-gray-200">
                            {user.name} {/* User name next to SS Auth */}
                        </span>
                    )}
                </div>
                
                <div className="flex gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link to="/reset-password" className="px-4 py-2 bg-white text-blue-500 rounded-full shadow hover:bg-gray-200">
                                Reset Password
                            </Link>
                            <button onClick={handleLogout} className="px-4 py-2 bg-white text-blue-500 rounded-full shadow hover:bg-gray-200">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 bg-white text-blue-500 rounded-full shadow hover:bg-gray-200">
                                Login
                            </Link>
                            <Link to="/register" className="px-4 py-2 bg-white text-blue-500 rounded-full shadow hover:bg-gray-200">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;