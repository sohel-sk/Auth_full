import react from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/verify/:token" element={<EmailVerify />}></Route>
        <Route path="/reset-password" element={ <ResetPassword/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
