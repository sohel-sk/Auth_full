import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;


const DashBoard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => { 
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
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
                
            }
        }

        fetchUserData();
    },[navigate]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-600">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>
                {user ? (
                    <div>
                        <p className="text-gray-600"><strong>Name:</strong> {user.name}</p>
                        <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
                        <button 
                            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded hover:bg-red-600"
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/login");
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">Loading user data...</p>
                )}
            </div>
        </div>
    );
}

export default DashBoard;