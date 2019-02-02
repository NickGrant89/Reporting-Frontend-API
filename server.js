//Using modual

const morgan = require('morgan'); // Console Logger
const Joi = require('joi');  // Joi is a validator, making code smaller//
const express = require('express'); // Express Framework
const path = require('path');
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database')
const passport = require('passport');

// This calls the Device model to intergate the DB

const ensureAuthenticated = require('../onecEnterprise/middleware/login-auth')

let Site = require('./models/site');

let User = require('./models/user');

let Company = require('./models/company');

let Device = require('./models/device');

// Call Moongoose connection
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

//Logs all requests to the consol.
app.use(morgan('dev'));

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


//GET display SB Admin page

app.get('/', ensureAuthenticated, function(req, res){
    User.findById(req.user.id, function(err, user){
        if(user.admin == 'Super Admin'){
           return res.redirect('/admin/dashboard')
        }
        //console.log(user)
    Site.find({'name': user.sites}, function(err, sites){
        User.find({}, function(err, users){
            Company.find({}, function(err, companies){
            Company.countDocuments({'name':user.company}, function(err, numOfCompanies) {
                Site.countDocuments({'name': user.sites}, function(err, numOfSites) {
                    User.countDocuments({'company': user.company}, function(err, numOfUsers) {
                        Device.countDocuments({'site': user.sites, 'status':'Active'}, function(err, numOfDevices) {
                            if(err){
                                console.log(err)
                            }
                            else{
                                res.render('index', {
                                    title:'Dashboard',
                                    sites: sites,
                                    users:users,
                                    companies:companies,
                                    numOfCompanies: numOfCompanies,
                                    numOfSites: numOfSites,
                                    numOfUsers:numOfUsers,
                                    numOfDevices:numOfDevices,
                                });
                            }
                        });        
                    });  
                });
            });
        });         
    });
});
});
});

// Route File

let devices = require('./routes/devices');
let users = require('./routes/users');
let jwt = require('./routes/apiJWT');
let apiDevices = require('./routes/apiDevices');
let apiCompany = require('./routes/apiCompany');
let companies = require('./routes/companies');
let site = require('./routes/sites');
let admin = require('./routes/admin');

app.use('/devices', devices);
app.use('/users', users);
app.use('/api/v1/devices/', apiDevices);
app.use('/api/v1/company/', apiCompany);
app.use('/api/v1/auth/', jwt);
app.use('/companies', companies);
app.use('/sites', site);
app.use('/admin', admin);

app.get('*', function(req, res) {
    res.status(404).end();
    res.redirect('/');
  });

const port = process.env.Port || 3000;

app.listen(port, '192.168.178.23', () => console.log('Example app listening on port' + ' ' + port +  '!'))
