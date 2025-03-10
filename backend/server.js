const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config({path: __dirname+"/.env"});
console.log("PORT from .env:", process.env.PORT);
const PORT = process.env.PORT;

// Initialize Express app
const app =express();

// Middleware
app.use(express.json());
app.use(cors());


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connnected!"))
    .catch((err) => console.log(err));
    
// test route 

app.get("/", (req, res) => {
    console.log(" MERN Auth APi is running.. ");
});

// start server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
