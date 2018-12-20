const Joi = require('joi');  // Joi is a validator, making code smaller//

const jwt = require('jsonwebtoken');

let User = require('../models/user');

let Company = require('../models/company');

exports.deCodeed = function (token) {
    
    const decoded = jwt.verify(token.split(" ")[1], 'secretkey', );
    console.log(decoded);
    return decoded;
};

exports.findUser = function (userID) {

    User.findById(userID, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        console.log(user);
        return user;
    });

    
};

//Validation 

exports.validateCompany= function (company){
    const schema ={
        name: Joi.string().min(3).required(),
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