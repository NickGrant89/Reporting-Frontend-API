const mongoose = require('mongoose');

// USer schema

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    }


});


let User = module.exports = mongoose.model('user', UserSchema);