const express = require('express');


require('dotenv').config();

const app = express();

const connectDB = require('./config/connectDB');


const PORT = process.env.PORT || 5000;

const userRoute = require('./routes/userRoutes');
const blogRoute = require('./routes/blogRoute');



app.use(express.json());

app.use('/api/v1', userRoute);
app.use('/api/v1', blogRoute);



const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

startServer();