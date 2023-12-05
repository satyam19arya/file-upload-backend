const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const morgan = require('morgan');
const cloudinary = require('cloudinary').v2;
const fileupload = require('express-fileupload');
const fileRoute = require('./routes/fileRoute');
dotenv.config('./.env');
const app = express();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json({ limit: "5mb" }));
app.use(morgan('common'));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const PORT = process.env.PORT;
dbConnect();

app.get('/', (req, res) => {
    res.send('Hello from server 😎');
});

app.use('/api/upload', fileRoute);

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});