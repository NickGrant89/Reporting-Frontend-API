module.exports = (req, res, next) => {

        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('danger', 'Please sign in')
            res.redirect('/users/login')
        }
    
}