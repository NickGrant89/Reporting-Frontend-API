const mongoose = require('mongoose');

// Sites schema

const SiteSchema = mongoose.Schema({
<<<<<<< HEAD:models/sites.js
    sitename:{
=======
    company:{
        type: String,
        required: true
    },
    name:{
>>>>>>> Roles-v0.1:models/site.js
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
<<<<<<< HEAD:models/sites.js
    },
    company:{
        type: String, 
        required: true
=======
>>>>>>> Roles-v0.1:models/site.js
    }
    
});


let Site = module.exports = mongoose.model('Site', SiteSchema);