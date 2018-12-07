// API Devices Functions
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkCompany = require('../middleware/check-company');
const of = require('../middleware/onec-functions');

// Import Device Model
let Company = require('../models/company');

let Site = require('../models/site');

let Device = require('../models/device');

let User = require('../models/user');



//GET Method for all Devices 

router.get('/', checkAuth, (req, res) => {
    console.log(of.ifSuperAdmin(req.params.id));
    Company.find({}, function(err, company){
        if(err){
            console.log(err)
        }else{
            //res.send(devices);
            res.json({
                company
            })
            //console.log(company);
        }
    }); 
});

//GET Singel device :

router.get('/nick', checkAuth, (req, res) => {
    const company = req.query.id;
    const site = req.query.site;
    const device = req.query.device;

    res.send(company + site + device);
});

//GET All Company + Sites + Devices - :id

router.get('/:id', checkAuth, checkCompany, (req, res) => {
    
    Company.findById(req.params.id, function(err, company){
        if(err){
            res.send(err);
        }
        const query = {'company': company.name};
            Site.find(query, function(err, site){
                Device.find(query, function(err, device){
                    if(!company) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')
                    res.json({
                        company: company,
                        sites: site,
                        devices: device
                        
                    });
                });
            }); 
        });
    }); 

//POST to add device

router.post('/', checkAuth, (req, res) => {
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

router.put('/:id', checkAuth, (req, res) => {
    Device.findById(req.params.id, function(err, device){
        if(!device) return res.status('404').send('The device with the given ID cannot be found!'), console.log('ID not found!')

        const {error} = validateDevice(req.body);

        if(error) return res.status('404').send(error.details[0].message), console.log(error.details[0].message);

        device.pcname = req.body.pcname;
        device.ipaddress = req.body.ipaddress;
        device.macaddress = req.body.macaddress;
        device.timestamp = req.body.timestamp;

        device.deviceinfo = req.body.deviceinfo;
            device.winver = req.body.winver;
            device.cpu = req.body.cpu;
            device.availablememory = req.body.availablememory;
            device.exipaddress = req.body.exipaddress;
            device.antivirus = req.body.antivirus;
            device.deviceuptime = req.body.deviceuptime;
            device.lastupdated = req.body.lastupdated;

        device.status = req.body.status;
            device.cpu = req.body.cpu;
            device.memory = req.body.memory;
            device.network = req.body.network;

        device.harddrivespace = req.body.harddrivespace;
            device.totalspace = req.body.totalspace;
            device.freespace = req.body.freespace;
            device.usedspace = req.body.usedspace;
            
        device.ocslogfile = req.body.ocslogfile;          

        device.save();
        res.send(device);
        console.log(device, 'Updated 200!');
    });
});

//DEL Method Device

router.delete('/:id', checkAuth, (req, res) => {
    Device.findById(req.params.id, function(err, device){
        if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')

        device.remove(device._id);

        res.send(device + 'Delete 200');
        console.log(device, 'Delete 200 ');
    });
});

//POST Device check

router.post('/checkin', checkAuth, function(req, res){
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

module.exports = router;