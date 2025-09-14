const express = require('express');
const router = express.Router();  //mini instance
const User = require('../models/User');
const passport = require('passport');

//to show register form
router.get('/register', (req,res)=>{
    res.render('auth/signup');
})

//to actually register in the DB
router.post('/register',async(req,res)=>{
    try{
        let {username, password, email, role} = req.body;
        const user = new User({username, email, role});
        const newUser =await User.register(user, password);
        // res.redirect('/login');
        req.login(newUser, function(err){
            if(err){
                return next(err); 
            }
            req.flash('success','Welcome to Product App!')
            res.redirect('/products');
        })
    }catch(e){
        req.flash('error',e.message)
        return res.redirect('/register');
    }

})


//to show login form
router.get('/login',(req,res)=>{
    res.render('auth/login');
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', info.message || 'Invalid username or password');
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            req.flash('success', 'Welcome back!');
            return res.redirect('/products');
        });
    })(req, res, next);
});

//logout
router.get("/logout",(req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success','Logged you out!')
    res.redirect('/login');
})

module.exports = router;
