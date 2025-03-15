const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => { 
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connnected!"))
        .catch((err) => console.log(err));

}
module.exports = connectDB;

