import { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch(
                `${apiUrl}/api/auth/forgot-password`,
                {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            if (response.ok) setMessage("Reset link sent to your email if user exists.");
            else setMessage(response.message);
        } catch (error) {
            setMessage("Something went wrong. Please try again later.");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-600">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
                {message && <p className="text-green-500 text-sm text-center">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Send Reset Link
                    </button>
                </form>
                <p className="text-sm text-gray-500 text-center mt-4">
                    <a href="/login" className="text-blue-500 hover:underline">Back to Login</a>
                </p>
            </div>
        </div>
    );
}
 
export default ForgotPassword;