const express = require('express');
const router = express.Router();

let Device = require('../models/device');

//GET Method to display devices on page.

router.get('/', function(req, res){

    Device.find({}, function(err, devices){
        if(err){
            console.log(err)
        }else{
            res.render('index', {
                title:'Devices',
                devices: devices,
            });
        }
    });
  });

//GET display add device page with form  

router.get('/add', (req, res) => {
    res.render('add_device', {
    title:'Add Device',
             
    });
});



//Get single device page
router.get('/:id', (req, res) => {
    Device.findById(req.params.id, function(err, device){
        res.render('device', {
            device:device
                     
        });
    });  
});

//Add submit device with form
router.post('/add', (req, res) => {
    
      let device = new Device();
      device.pcname = req.body.pcname;
      device.ipaddress = req.body.ipaddress;
      device.macaddress = req.body.macaddress;
   
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
   console.log(req.body.pcname)
});

//Load edit form
router.get('/edit/:id', (req, res) => {
    Device.findById(req.params.id, function(err, device){
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
    let query = {_id:req.params.id}

    Device.remove(query, function(err){
        if(err){
            console.log(err)
        }
        res.send('Success');
    });
});

module.exports = router;