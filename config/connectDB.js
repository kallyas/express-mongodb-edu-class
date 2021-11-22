require('dotenv').config();
const mongoose = require('mongoose');
const { DEVELOPMENT, TEST, PRODUCTION, LOCAL } = require('./envTypes');

let DB_URI = '';
switch(process.env.NODE_ENV) {
    case DEVELOPMENT:
        DB_URI = process.env.MONGO_DB_URI_DEV;
        break;
    case PRODUCTION:
        DB_URI = process.env.MONGO_DB_URI_PROD;
        break;
    case LOCAL:
        DB_URI = process.env.MONGO_DB_URI_LOC;
        break;
    case TEST:
        DB_URI = process.env.MONGO_DB_URI_TEST;
        break;
    default:
        DB_URI = process.env.MONGO_DB_URI_LOC;
}


const connectDB = async () => {
    console.log('Connecting to database...');
    mongoose.connect(DB_URI);
}

module.exports = connectDB;