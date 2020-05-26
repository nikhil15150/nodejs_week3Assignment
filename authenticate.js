const passport = require("passport");

var localstratgy=require('passport-local').Strategy;

var user=require('./models/users');
///////////////if you want to use passport-local-mongoose authentication else you can write your own authentication
exports.local=passport.use(new localstratgy(user.authenticate()));

///////////to use session
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
