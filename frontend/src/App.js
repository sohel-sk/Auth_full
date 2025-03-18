import react from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import DashBoard from './pages/DashBoard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from './pages/ForgotPassword';



function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/verify/:token" element={<EmailVerify />}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
        <Route path="/forgot-password" element={ <ForgotPassword/>}></Route>
        <Route path="/dashboard" element={<DashBoard/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
