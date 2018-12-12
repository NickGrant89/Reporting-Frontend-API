const Joi = require('joi');  // Joi is a validator, making code smaller//

const jwt = require('jsonwebtoken');

let User = require('../models/user');


exports.ifSuperAdmin = function (id, ) {
    
    return id;
};

exports.myDateTime1 = function () {
    return Date();
};

exports.ValidateUser = function(auth){
    const decoded = jwt.verify(auth, 'secretkey', );

        User.findById(decoded.userId, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            if(user.admin != 'Admin') return res.status(401).send('');
        });
}

//Validation 

exports.validateCompany= function (company){
    const schema ={
        companyname: Joi.string().min(3).required(),
        email: Joi.string().min(3).required(),
        address: Joi.string().min(3).required(),
        city: Joi.string().min(3).required(),
        county: Joi.string().min(3).required(),
        postcode: Joi.string().min(3).required(),
        country: Joi.string().min(3).required(),
        phonenumber: Joi.allow(),
        phone: Joi.allow(),
        mobile: Joi.allow(),
    };

    return Joi.validate(company, schema);
} 