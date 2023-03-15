const mongoose = require('mongoose');

const ramadanSchema = new mongoose.Schema({
    year:{
        type: Number,
        required: true
    },
    date:{
        //array of objects
        type: Array,
        required: true
    }

});

const Ramadan = mongoose.model('Ramadan', ramadanSchema);
module.exports = Ramadan;