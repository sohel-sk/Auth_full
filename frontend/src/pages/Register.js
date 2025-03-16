import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => { 
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => { 
        e.preventDefault();
        const configuration = {
            method: "post",
            url: `${apiUrl}/api/auth/register`,
            data: {
                name,
                email,
                password
            },
        };
        axios(configuration).then((result) => { setRegister(true) }).catch((error) => { error = new Error() });
        alert("submit Successfull!");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border rounded mb-3"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded mb-3"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded mb-3"
            />
            <button
                type="submit"
                className="w-full bg-cyan-500 text-white p-2 rounded"
                onClick={(e) => handleSubmit(e)}>
            Register
            </button>
            </form>
            <p className="mt-3 text-center text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-500 ml-1">Login</Link>
            </p>
            </div> {register ? (
            <p className="text-success">You Are Registered Successfully</p>
            ):(<p></p>)}
        </div>
    );
}

export default Register;