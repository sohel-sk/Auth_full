// import express from 'express';
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/UserAuth.js');
const dotenv = require('dotenv');
const path = require('path');
const authMiddleware = require('./middleware/AuthMiddleware.js');
dotenv.config({ path: path.resolve('./backend/.env') });
const PORT = process.env.PORT;


// Initialize Express app
const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);



    
// test route 

app.get("/", (req, res) => {
    console.log(" MERN Auth APi is running.. ");
});

// start server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
