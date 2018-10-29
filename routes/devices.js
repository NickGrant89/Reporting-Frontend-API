const express = require('express');
const router = express.Router();

let Device = require('../models/device');
//User Model
let User = require('../models/user');

//Access Controle
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('danger', 'Please sign in')
        res.redirect('/users/login')
    }
}


//GET Method to display devices on page.

router.get('/', ensureAuthenticated, function(req, res){

    Device.find({}, function(err, devices){
        if(err){
            console.log(err)
        }else{
            res.render('devices', {
                title:'Devices',
                devices: devices,
            });
        }
    });
  });

//GET display add device page with form  

router.get('/add', ensureAuthenticated, function(req, res){
    res.render('add_device', {
    title:'Add Device',
             
    });
});

//Get single device page
router.get('/:id', (req, res) => {
    Device.findById(req.params.id, function(err, device){
        User.findById(device.owner, function(err, user){
            res.render('device', {
                device:device,
                owner:user.name
        });           
        });
    });  
});


// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator/check');

router.post('/add', [
    //Name
    check('pcname').isLength({min:3}).trim().withMessage('PC Name required'),
    //Company
    check('ipaddress').isLength({min:1}).trim().withMessage('IP Address required'),
    //Username
    check('macaddress').isLength({ min: 6}),
    // username must be an email
    check('company').isLength({min:3}).trim().withMessage('Company Name required'),
    check('site').isLength({ min: 1}),
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('danger', 'Please try again' ,{errors:errors.mapped()} );
    res.redirect('/devices/add');
    
    //res.render('register',)

   return { errors: errors.mapped() };
  }
  let device = new Device();
  device.pcname = req.body.pcname;
  device.ipaddress = req.body.ipaddress;
  device.macaddress = req.body.macaddress;
  device.company = req.body.company;
  device.site = req.body.site;
  device.owner = req.user._id;

  device.save(function(err){
       if(err){
           console.log(err);
           return;
       }
       else{
           req.flash('success', 'Device Added')
           res.redirect('/devices')
       }
  });  

});



//Load edit form
router.get('/edit/:id', ensureAuthenticated,  function(req, res){
    Device.findById(req.params.id, function(err, device){
        {
            req.flash('danger', 'Not Authorised');
            res.redirect('/');
        }
        res.render('edit_device', {
            title:'Edit Device',
            device:device
                     
        });
    });  
});

//Add submit device with form
router.post('/edit/:id', (req, res) => {
    let device = {};
    device.pcname = req.body.pcname;
    device.ipaddress = req.body.ipaddress;
    device.macaddress = req.body.macaddress;
   

    let query = {_id:req.params.id}
 
    Device.update(query, device, function(err){
         if(err){
             console.log(err);
             return;
         }
         else{
             res.redirect('/devices')
         }
    });
    console.log(req.body.pcname)
 });

 //Delete edit form
router.delete('/:id', (req, res) => {
    if(!req.user._id){
        res.status(500).send();
    }

    let query = {_id:req.params.id}

    Device.findById(req.params.id, function(err, device){
        if(device.owner != req.user._id){
            res.status(500).send();
        }else{
            Device.deleteOne(query, function(err){
                if(err){
                    console.log(err)
                }
                res.send('Success');
            });
        }
    });
});

module.exports = router;