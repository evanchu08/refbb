
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// file upload need formidable
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const async = require('async');
const SHA1 = require("crypto-js/sha1");
const moment = require('moment');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_Key,
    api_secret: process.env.CLOUD_API_Secret
})
//Route
const userRoute = require('./routes/userRoute');
const siteRoute = require('./routes/siteRoute');
const productRoute = require('./routes/productRoute');

app.use(express.static('client/build'))



app.use('/api/users', userRoute);
app.use('/api/product', productRoute);
app.use('/api/site', siteRoute);


// DEFAULT 
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})