import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setStatus("");

        if (newPassword !== confirmNewPassword) {
            setError("Password do not match.");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/auth/reset-password/${token}`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword }),
            });
            const data = response.json();
            if (response.ok) {
                setStatus("Password reset successfull. You can login now.");
                setTimeout(() => navigate("/login"), 3000);
            } else throw new Error(data.message );
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {status && <p className="text-green-500 text-sm text-center">{status}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm">New Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Confirm new password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
 
export default ResetPassword;