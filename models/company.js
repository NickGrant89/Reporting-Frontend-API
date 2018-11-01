const mongoose = require('mongoose');

// User schema

const CompanySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    county:{
        type: String,
        required: true
    },
    postcode:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
<<<<<<< HEAD
    company:{
        type: String,
        required: true
    }
    
=======
>>>>>>> Roles-v0.1
});


let Company = module.exports = mongoose.model('Company', CompanySchema);