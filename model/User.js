const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String, 
        required: true,
        min: 6,
        max: 255
    },
    middlename: {
        type: String, 
        required: false
    },
    lastname: {
        type: String, 
        required: true,
        min: 6,
        max: 255
    },        
    email: {
        type: String, 
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String, 
        required: true,
        min: 6,
        max: 1024
    },       
    date: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model('User', userSchema);