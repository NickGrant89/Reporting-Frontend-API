const express = require('express');
const router = express.Router();

//User Model
let Site = require('../models/site');

//User devices
let Device = require('../models/device');

let Company = require('../models/company');

// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/add', [
    //Name
    check('name').isLength({min:3}).trim().withMessage('PC Name required'),
    //site
    check('email').isLength({min:1}).trim().withMessage('IP Address required'),
    //Username
    check('address').isLength({ min: 3}),
    // username must be an email
    check('postcode').isLength({min:1}).trim().withMessage('site postcode required'),
    // username must be an email
    check('country').isLength({min:1}).trim().withMessage('site country required'),

    check('phonenumber').isLength({min:1}).trim().withMessage('site number required'),

    ], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/sites/add');
    
    //res.render('register',)

   return { errors: errors.mapped() };
  }
  let site = new Site();
  site.name = req.body.name;
  site.email = req.body.email;
  site.address = req.body.address;
  site.city = req.body.city;
  site.county = req.body.county;
  site.postcode = req.body.postcode;
  site.country = req.body.country;
  site.phonenumber = req.body.phonenumber;
  site.company = req.body.company;
  

  site.save(function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           req.flash('success', 'site Added')
           res.redirect('/sites')
       }
  });  

});


router.get('/add', function(req, res){
    Company.find({}, function(err, companies){
    res.render('add_site', {
    title:'Add Site',
    companies: companies,       
    });
});
});

//GET Method to display devices on page.

router.get('/', function(req, res){

    Site.find({}, function(err, sites){
        if(err){
            console.log(err)
        }else{
            res.render('sites', {
                title:'Sites',
                sites: sites,
            });
        }
    });
  });

    //Get single site page
router.get('/:id', (req, res) => {
    Site.findById(req.params.id, function(err, site){
        Device.find({}, function(err, devices){
            res.render('site', {
                title: site.name,
                site:site,
                devices:devices

             });
         });
    });  
});

module.exports = router;