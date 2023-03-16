const express = require('express');
const dotenv = require('dotenv');
const app = express();
const ramadanRoutes = require('./routes/ramadanRoutes');
const fileUpload = require('express-fileupload');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(cors(
    {
        origin: 'https://ramadantimes.netlify.app'
    }
));



const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
         console.log('Connected to MongoDB');
     } catch (err) {
         console.log(err);
     }
}


app.use('/ramadan', ramadanRoutes);

app.listen(process.env.PORT, () => {
    connect();
    console.log('Server started on port 5000');
});