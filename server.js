const express = require('express');
const dotenv = require('dotenv');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

dotenv.config();

app.use(bodyParser.json());
app.use(cors(
    {
        origin: 'http://localhost:4200'
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




app.listen(process.env.PORT, () => {
    connect();
    console.log('Server started on port 3000');
});