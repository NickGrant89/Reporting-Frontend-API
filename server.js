//Using modual

const Joi = require('joi');  // Joi is a validator, making code smaller//
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database')
const passport = require('passport');

// This calls the Device model to intergate the DB

let Site = require('./models/site');

let User = require('./models/user');

let Company = require('./models/company');

let Device = require('./models/device');
//MongoDB connetion

const mongoose = require('mongoose');
mongoose.connect(config.database,{ useNewUrlParser: true });

// Starting DB connection

let db = mongoose.connection;

db.once('open', function(){
    console.log('MongoDB Live');

})

db.on('error', function(err){
    console.log(err);

});

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

//Passport Config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
})

//Access Controle
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('danger', 'Please sign in')
        res.redirect('/users/login')
    }
}

//GET display SB Admin page

app.get('/', function(req, res){
    
   
    
    Site.find({}, function(err, sites){
        User.find({}, function(err, users){
            Company.countDocuments({}, function(err, numOfCompanies) {
                Site.countDocuments({}, function(err, numOfSites) {
            
            
            
                if(err){
                    console.log(err)
                }else{
                        res.render('index', {
                            title:'Dashboard',
                            sites: sites,
                            users:users,
                            numOfCompanies: numOfCompanies,
                            numOfSites: numOfSites,
                            
                        

                            })}
                       
                    });
                });
             });         
        });
            Device.countDocuments({}, function(err, numOfDevices) {
                
                
                    if(err){
                        console.log(err)
                    }else{
                            
                                return numOfDevices;
                            
    
                                }
                            });
                    
            
        });

// Route File

let devices = require('./routes/devices');
let users = require('./routes/users');
<<<<<<< HEAD
let apiDevices = require('./routes/apiDevices');
let company = require('./routes/company');

app.use('/devices', devices);
app.use('/users', users);
app.use('/api/v1/devices', apiDevices);
app.use('/company', company);
=======
let api = require('./routes/api');
let companies = require('./routes/companies');
let site = require('./routes/sites');

app.use('/devices', devices);
app.use('/users', users);
app.use('/api', api);
app.use('/companies', companies);
app.use('/sites', site);
>>>>>>> Roles-v0.1

app.get('*', function(req, res) {
    res.status(404).end();
    res.redirect('/');
  });

  

//Validation 

function validateDevice(device){
    const schema ={
        pcname: Joi.string().min(3).required()
        
    };

    return Joi.validate(device, schema);
}

const port = process.env.Port || 3000;

app.listen(port, () => console.log('Example app listening on port' + ' ' + port +  '!'))