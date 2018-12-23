const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const passport = require('passport');

//Passport Config
require('../config/passport')(passport);

//Bring in Users Model
let User = require('../models/user');
//Bring in Users Model
let Company = require('../models/company');
//Bring in Users Model
let Site = require('../models/site');



//Get all users
router.get('/', function(req, res){
    User.find({}, function(err, users){
        if(err){
            console.log(err)
        }else{
            res.render('users', {
                title:'Users',
                users: users,
            });
        }
    });
});

 //Get register form
router.get('/register', function(req, res){
    Company.find({}, function(err, companies){
        Site.find({}, function(err, sites){
            res.render('register', {
                title:'Registration',
                companies: companies,
                sites: sites,
            });
        });
    });
});



// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/register', [

    //Name
    check('name').isLength({min:3}).trim().withMessage('Name required'),
    //Company
    check('company').isLength({min:1}).trim().withMessage('Company required'),
    //Company
    check('site').isLength({min:1}).trim().withMessage('Site required'),
    //Username
    check('username').isLength({ min: 1}),
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 1 }),

    //check('password2').equals('password')
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/users/register');

    //res.render('register',)

   return { errors: errors.mapped() };
  }

  let user = new User();
  user.admin = req.body.admin;
  user.name = req.body.name;
  user.email = req.body.email;
  user.company = req.body.company;
  user.site = req.body.site;
  user.username = req.body.username;
  user.password = req.body.password;
  user.password2 = req.body.password2;

  bcrypt.genSalt(10, function(errors, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            if(errors){
                console.log(err);
            }else{
                user.password = hash;
                user.save(function(err){
                    if(errors){
                        console.log(err);
                        return;
                    }else{
                        req.flash('success', 'You are now registered');
                        res.redirect('/users/login');
                    }
                });
            }
        });
    });
});


//login form
router.get('/login', function(req, res){
    res.render('login');
})

//login form
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/users/login');
});

//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


module.exports = router;