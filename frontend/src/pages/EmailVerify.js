
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const EmailVerify = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("Verifying....");

    useEffect(() => { 
        const verifyUser = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/auth/verify/${token}`, { method: "get" });
                const data = await response.json();
                if (response.ok) {
                    setStatus("Email verified Sucessfully! You can now log in.");
                    setTimeout(() => navigate("login"), 3000);
                } else {
                    setStatus(data.message || "Invalid or Expired Verification Link")
                }
            } catch (error) {
                setStatus("An error occured while verifying email.")
            }
        };
        verifyUser();
    },[token,navigate]);
    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
            <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
            <p>{status}</p>
        </div>
        </div>
    );
}
 
export default EmailVerify;