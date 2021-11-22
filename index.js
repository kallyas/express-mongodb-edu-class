const express = require('express');
const cors = require('cors');


require('dotenv').config();

const app = express();

const connectDB = require('./config/connectDB');


const PORT = process.env.PORT || 5000;

const userRoute = require('./routes/userRoutes');
const blogRoute = require('./routes/blogRoute');


app.use(cors());
app.use(express.json());

app.use('/api/v1', userRoute);
app.use('/api/v1', blogRoute);



const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`app using environment ${process.env.NODE_ENV}`)
        console.log(`Server started on port ${PORT}`);
    });
}

startServer();

module.exports = app; // for testing