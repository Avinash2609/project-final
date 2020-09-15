var express=require("express");
var passport=require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var router=express.Router({mergeParams: true});
var User=require("../models/user");


passport.use(new GoogleStrategy({
    clientID: "661951738728-bep3r57422ovb9h01jcrp5ct5qgrdd7u.apps.googleusercontent.com",
    clientSecret: "MvQgKyi7FkFAO4EnfuCPZ9Yl",
    // callbackURL: "http://localhost:3000/google/callback",
    callbackURL: "https://avinashjindal2510.herokuapp.com/google/callback",
    passReqToCallback: true
  },
  function(request,accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done(null,profile);
  }
));

passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});


router.get("/",function(req,res){
    res.render("partials/landingpage");
})



router.get("/register", function(req,res){
    res.render("auth_files/register");
})

router.get("/google", passport.authenticate('google',{scope:['profile','email']}));

router.get("/google/callback",passport.authenticate('google',
{failureRedirect:"/register"}),function(req,res){
    res.redirect("/success");
})

router.get("/success",function(req,res){

    req.flash("success", "Welcome!!! you are successfully Logged In as " + req.user.displayName);
    res.redirect("/campgrounds");
})


router.get("/logout",function(req,res){
    req.flash("success", "Thank you!!! you are successfully Logged Out");
    req.logOut();
    res.redirect("/campgrounds");
})

module.exports = router;