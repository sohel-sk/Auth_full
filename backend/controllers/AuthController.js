const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const sendEmail = require('../config/sendEmail');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');

const register = async (req, res) => { 
    const{name, email, password} = req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:"Missing Details"});
    }

    try {
        // checking if exists;
        let existingUser = await userModel.findOne({ email });
        if (existingUser) { 
            return res.status(400).json({ message: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        const verificationToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        await user.save();

        const verificationLink = `http://localhost:5000/api/auth/verify/${verificationToken}`;
        const emailMessage = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;
        await sendEmail(user.email, "Verify Your Email", emailMessage);

        res.status
            (201).json({ message: "User registered. Check Email for verification link." });
    }
    catch (err) { 
        res.json({ success: false, message: err.message });
    }
}

const login = async (req, res) => { 
    const { email, password } = req.body;
    
    try {
        const existingUser = await userModel.findOne({ email });
        // res.json({ message: "here we are" });
        if (!existingUser) {
            return res.json({ success: false, message: "Invalid email" });
        }
        console.log(existingUser.isVerified);
        if (!existingUser.isVerified) {
            return res.status(403).json({ error: "Email not verified. check your inbox" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.json({ success: false, message: "invalid password" });
        }


        
        const token = jwt.sign({ id: existingUser.id,email:existingUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.json({ message : "Login succesfull!", token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const checkVerification = async (req, res) => { 
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: "User not found.", message: error.message });
        }
        user.isVerified = true;
        await user.save();
        

        res.json({ message: "Email verified successsfully." });
    } catch (error) {
        return res.status(400).json({ error: "Invalid token", message: error.message });
    }
}
const forgotPassword = async (req, res) => { 
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) return res.status(404).json({ error: "USer not found", message: error.message });


        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000;
        
        await userModel.updateOne(
            { email },
            { resetToken, resetTokenExpiry: Date.now() + 3600000 }
        );


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset request",
            text: `Click the link to reset your password : ${process.env.CLIENT_URL}/reset-password/${resetToken}`
        };
        

        await transporter.sendMail(mailOptions);
        console.log("here");

        res.json({ message: "Reset password link sent to mail successfully" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ success: false, message: "Missing Details" });

    try {
        const user = await userModel.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });
        if (!user) return res.status(400).json({ error: "Invalid token " });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetToken = null;
        user.resetTokenExpiry = null;
        user.save();

        res.json({ message: "Password reset successfull!" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { register, login ,checkVerification ,forgotPassword, resetPassword};