import { Link } from "react-router-dom";

const Home = () => {
    return ( 
        <div className="min-h-screen flex flex-col  items-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
            {/* <header className="min-w-full p-4 flex justify-between items-center bg-white bg-opacity-20 backdrop-blur-md shadow-md">
                <h1 className="text-2xl font-bold">SS Auth</h1>
                <div className="space-x-4">
                    <Link to="/login" className="px-4 py-2 bg-white text-blue-500 rounded-full shadow hover:bg-gray-200">Login</Link>
                    <Link to="/register" className="px-4 py-2 bg-white text-blue-500 rounded-full shadow hover:bg-gray-200">Register</Link>
                </div>
            </header> */}
            
            <main className="text-center mt-20">
                <h2 className="text-4xl font-bold mb-4">Secure & Fast Authentication System</h2>
                <p className="text-lg max-w-2xl mx-auto mb-6">A powerful and secure authentication system for managing user accounts, password resets, and authentication flows.</p>
                <Link to="/register" className="px-6 py-3 bg-white text-blue-500 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-200">Get Started</Link>
            </main>
        </div>
    );
}

export default Home;