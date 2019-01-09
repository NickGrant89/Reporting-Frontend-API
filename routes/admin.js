const express = require('express');
const router = express.Router();

//Access Control
const ensureAuthenticated = require('../middleware/login-auth');

let Device = require('../models/device');

let User = require('../models/user');

let Site = require('../models/site');

let Company = require('../models/company');

const of = require('../middleware/onec-functions');

//Device check in view
router.get('/dashboard', ensureAuthenticated, function(req, res){
    User.findById(req.user.id, function (err, user) {
        if(user.admin != 'Super Admin'){
            req.flash('danger', 'Unauthorized');
            res.redirect('/');
        }
        else{
            Site.find({}, function(err, sites){
                User.find({}, function(err, users){
                    Company.find({}, function(err, companies){
                    Company.countDocuments({}, function(err, numOfCompanies) {
                        Site.countDocuments({}, function(err, numOfSites) {
                            User.countDocuments({}, function(err, numOfUsers) {
                                Device.countDocuments({}, function(err, numOfDevices) {
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        res.render('admin_dashboard', {
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
        }
    });    
});


module.exports = router;