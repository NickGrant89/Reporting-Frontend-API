const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const passport = require('passport');

//Passport Config
require('../config/passport')(passport);


//Bring in Users Model

let User = require('../models/user');

router.get('/register', function(req, res){
    res.render('register');
});

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/register', [
  //Username
  check('username').isLength({ min: 5}),
  // username must be an email
  check('email').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again', { errors: errors.array() });
    res.redirect('/users/register');

    res.render('register',)

   return res.status(422).json({ errors: errors.array() });;
  }

  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.company = req.body.company;
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


router.post('/register1', (req, res) => {
    
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.company = req.body.company;
    user.username = req.body.username;
    user.password = req.body.password;
    user.password2 = req.body.password2;


    //NEEDS VALIDATION PASSWORD MATCH ECT ECT 

    const error = validateDevice(user);

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            if(error){
                console.log(err);
            }else{
                user.password = hash;
                user.save(function(err){
                    if(error){
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
 

 console.log(req.body.pcname)
});

//Validation 

function validateDevice(user){
    const schema ={
        name: Joi.string().min(3).required()
        
    };

    return Joi.validate(user, schema);
}

//register process
router.post('/home/register', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const company = req.body.company;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    //check('name').notEmpty(),

    req.check('Name', 'Name is required').notEmpty();
    req.check('Email', 'Email is required').isEmail();
    req.check('Company', 'Company is required').notEmpty();
    req.check('Username', 'Username is required').notEmpty();
    req.check('Password', 'Password is required').notEmpty();
    req.checkBody('Password2', 'Passwords do not match!').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
    }else{
        let newUser = new User({
            name:name,
            email:email,
            company:company,
            username:username,
            password:password,
            password2:password2
        });

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(error){
                    console.log(err);
                }else{
                    newUser.password = hash;
                    newUser.save(function(err){
                        if(error){
                            console.log(err);
                            return;
                        }else{
                            req.flash('success', 'You are now registered');
                            res.redirect('/user/login');
                        }
                    });
                }
            });
        });
    }
});

//login form
router.get('/login', function(req, res){
    res.render('login');
})

//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true 
    })(req, res, next);
});


module.exports = router;