const express = require('express');
const router = express.Router();

//User Model
let Company = require('../models/company');

router.get('/add', function(req, res){
    res.render('add_company', {
    title:'Add Company',
             
    });
});

// Add Company

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/add', [
    //Name
    check('name').isLength({min:3}).trim().withMessage('PC Name required'),
    //Company
    check('email').isLength({min:1}).trim().withMessage('IP Address required'),
    //Username
    check('address').isLength({ min: 3}),
    // username must be an email
    check('postcode').isLength({min:3}).trim().withMessage('Company Name required'),
    // username must be an email
    check('country').isLength({min:3}).trim().withMessage('Company Name required'),

    check('phonenumber').isLength({min:3}).trim().withMessage('Company Name required'),

    check('company').isLength({min:3}).trim().withMessage('Company Name required'),
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/company/add');
    
    //res.render('register',)

   return { errors: errors.mapped() };
  }
  let company = new Company();
  company.name = req.body.name;
  company.email = req.body.email;
  company.address = req.body.address;
  company.city = req.body.city;
  company.county = req.body.county;
  company.postcode = req.body.postcode;
  company.country = req.body.country;
  company.phonenumber = req.body.phonenumber;
  company.company = req.body.company;

  company.save(function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           req.flash('success', 'Device Added')
           res.redirect('/company')
       }
  });  

});



module.exports = router;