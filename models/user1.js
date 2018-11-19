const mongoose = require('mongoose');

// User schema

const UserSchema = mongoose.Schema({
   
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required: true
    }


});


let User = module.exports = mongoose.model('User', UserSchema);