//Using modual

const Joi = require('joi');  // Joi is a validator, making code smaller//
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');





//MongoDB connetion

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/devices',{ useNewUrlParser: true });

// Starting DB connection

let db = mongoose.connection;

db.once('open', function(){
    console.log('MongoDB Live');

})

db.on('error', function(err){
    console.log(err);

});

// This calls the Device model to intergate the DB

let Device = require('./models/device');

const app = express();
app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Set Public folder

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, 'sbadmin')))

//Express session Middleware

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

  //Express message middleware

  app.use(require('connect-flash')());
  app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//GET display SB Admin page

app.get('/', (req, res) => {
    res.render('sbadmin', {
    title:'One C Admin',
             
    });
});





//GET Method for devices // API Functions

app.get('/api/devices', (req, res) => {
    
    Device.find({}, function(err, devices){
        if(err){
            console.log(err)
        }else{
    res.send(devices);
    console.log(devices);
        }
    
    })
    
});

//GET Singel device :id

app.get('/api/devices/:id', (req, res) => {

    const device = Device.find(d => d.id === parseInt(req.params.id))
    if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')
    res.send(device);
    
});

//Post requests to add device

app.post('/api/devices', (req, res) => {
    const {error} = validateDevice(req.body);

   if(error){
       res.status('404').send(error.details[0].message)
       console.log(error.details[0].message);
       return; 
   } 

    const device = {
        id: devices.length +1,
        name: req.body.name
       
    };
    devices.push(device);
    res.send(device);
    console.log(device , ' Created 200');
});

//PUT Method update single device

app.put('/api/devices/:id', (req, res) => {
    const device = devices.find(d => d.id === parseInt(req.params.id))
    if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')

    const {error} = validateDevice(req.body);

    if(error) return res.status('404').send(error.details[0].message), console.log(error.details[0].message);
     
 

    device.name = req.body.name;
    device.ver = req.body.ver;
 
    res.send(device);
    console.log(device, 'Updated 200!');
});

//DEL Method 

app.delete('/api/devices/:id', (req, res) => {
    const device = devices.find(d => d.id === parseInt(req.params.id))
    if(!device) return res.status(404).send('The device with the given ID cannot be found!'), console.log('ID not found!')

    const index = devices.indexOf(device);

    devices.splice(index, 1);

    res.send(device);
    console.log(device, 'Delete 200 ');

});

let devices = require('./routes/devices');
app.use('/devices', devices);

//Validation 

function validateDevice(device){
    const schema ={
        name: Joi.string().min(3).required(),
        ver: Joi.string().min(3).required()
        
    };

    return Joi.validate(device, schema);
}

const port = process.env.Port || 3000;

app.listen(port, () => console.log('Example app listening on port' + ' ' + port +  '!'))