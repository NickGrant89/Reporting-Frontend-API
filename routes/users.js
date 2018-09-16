const express = require('express');
const router = express.Router();

//Bring in Users Model

let User = require('../models/user');

router.get('/register', function(req, res){
    res.render('register');
});

module.exports = router;