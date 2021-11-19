require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    console.log('Connecting to database...');
    mongoose.connect(process.env.MONGO_DB_URI);
}

module.exports = connectDB;