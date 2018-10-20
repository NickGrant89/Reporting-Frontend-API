const mongoose = require('mongoose');

// Sites schema

const SiteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    company:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Company'
    }
});


let Site = module.exports = mongoose.model('Site', SiteSchema);