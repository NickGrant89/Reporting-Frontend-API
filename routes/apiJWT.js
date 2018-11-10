// API Devices Functions

const express = require('express');
const router = express.Router();
const Joi = require('joi');  // Joi is a validator, making code smaller//
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


router.get('/helloworld', (req, res) => {
    res.json({
        message: 'Hello World - Welcome to API Auth'
    });
});

router.post('/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'sercretkey', function(err, authData){
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Post Created ...',
                authData
            });
        }
    });
});

router.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'nick',
        email: 'nickgrant1989@live.co.uk'
    }

    jwt.sign({user}, 'sercretkey', {expiresIn: '30s'}, function(err, token){
        if(err){

        }
        else{
            res.json({
                token
            });
        }
    });
});

function verifyToken(req, res, next){
    //get auth header token
    const bearerheader = req.headers['authorization'];
    // check if bearer is unfifined 
    if(typeof bearerheader !== 'undefined'){
        //Split at the space
        const bearer = bearerheader.split(' ');
        //get token from array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //Next middelwear
        next();

    }else{
        res.sendStatus(403);
    }

}

module.exports = router;