// API Devices Functions

const express = require('express');
const router = express.Router();
const Joi = require('joi');  // Joi is a validator, making code smaller//
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/check-auth');
const morgan = require('morgan');

//Bring in Users Model
let User = require('../models/user');


router.get('/helloworld', checkAuth, (req, res) => {
    res.json({
        message: 'Hello World - Welcome to API Auth'
    });
});

router.post('/post', checkAuth, (req, res) => {
    res.json({
        message: 'Post Created ...'
    });
});

router.post('/login', (req, res, next) => {

    User.find({email:req.body.email})
    
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'Auth Failed'
                
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message:'Auth Failed'
                });
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                'secretkey', // Need to replace this and hide!
                {
                    expiresIn:"1h"
                }

                );
                return res.status(200).json({
                    message:'Auth Successful',
                    token: token
                });
            }
            res.status(401).json({
                message:'Auth Failed'
            });
        });
    })
    .catch(err => {
        console.log(500).json({
            error:err
        });
    });
}); 

module.exports = router;