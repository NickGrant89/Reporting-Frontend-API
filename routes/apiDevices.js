// API Devices Functions

const express = require('express');
const router = express.Router();
const Joi = require('joi');  // Joi is a validator, making code smaller//
const bodyParser = require('body-parser');

// Import Device Model
let Device = require('../models/device');

//GET Method for all Devices 

router.get('/', (req, res) => {
    Device.find({}, function(err, devices){
        if(err){
            console.log(err)
        }else{
            res.send(devices);
            console.log(devices);
        }
    });
});

//GET Singel device :id

router.get('/:id', (req, res) => {

    Device.findById(req.params.id, function(err, device){
        
    if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')
    res.send(device);           
        
    });  
});

//POST to add device

router.post('/', (req, res) => {
    const {error} = validateDevice(req.body);

    if(error){
        res.status('404').send(error.details[0].message)
        console.log(error.details[0].message);
        return; 
    } 

    let device = new Device();
    device.pcname = req.body.pcname;
    device.ipaddress = req.body.ipaddress;
    device.macaddress = req.body.macaddress;
    device.status = req.body.status;
    device.timestamp = req.body.timestamp;
    device.deviceinfo = req.body.deviceinfo;
    device.winver = req.body.winver;
    device.ocslogfile = req.body.ocslogfile;


    device.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.send(device);
            console.log(device , ' Created 200');
        };

    });
});

//PUT Method update single device

router.put('/:id', (req, res) => {
    Device.findById(req.params.id, function(err, device){
        if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')

        const {error} = req.body;

        if(error) return res.status('404').send(error.details[0].message), console.log(error.details[0].message);

        device.pcname = req.body.pcname;
        device.ipaddress = req.body.ipaddress;
        device.macaddress = req.body.macaddress;
        device.status = req.body.status;
        device.timestamp = req.body.timestamp;
        device.deviceinfo = req.body.deviceinfo;
        device.winver = req.body.winver;
        device.ocslogfile = req.body.ocslogfile;

        device.save();
        res.send(device);
        console.log(device, 'Updated 200!');
    });
});

//DEL Method Device

router.delete('/:id', (req, res) => {
    Device.findById(req.params.id, function(err, device){
        if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')

        device.remove(device._id);

        res.send(device + 'Delete 200');
        console.log(device, 'Delete 200 ');
    });
});

//POST Device check

router.post('/checkin', function(req, res){
    const {error} = validateDevice(req.body);

    if(error){
        res.status('404').send(error.details[0].message)
        console.log(error.details[0].message);
        return; 
    } 

    let device = new Device();
    device.pcname = req.body.pcname;
    device.ipaddress = req.body.ipaddress;
    device.macaddress = req.body.macaddress;
    device.status = req.body.status;
    device.timestamp = req.body.timestamp;
    device.deviceinfo = req.body.deviceinfo;
    device.winver = req.body.winver;
    device.ocslogfile = req.body.ocslogfile;


    device.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.send(device);
            console.log(device , ' Created 200');
        };

    });
});

//Validation 

function validateDevice(device){
    const schema ={
        pcname: Joi.string().min(3).required(),
        ipaddress: Joi.string().min(3).required(),
        macaddress: Joi.string().min(3).required(),
        status: Joi.string().min(3).required(),
        timestamp: Joi.string().min(3).required(),
        deviceinfo: Joi.object(),
        winver: Joi.string().min(3),
        ocslogfile:Joi.string().min(3).required(),
        
    };

    return Joi.validate(device, schema);
}



module.exports = router;