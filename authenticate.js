const passport = require("passport");

var localstratgy=require('passport-local').Strategy;

var jwtStrategy=require('passport-jwt').Strategy;
var extractjwt=require('passport-jwt').ExtractJwt;
var jwt=require('jsonwebtoken');
var user=require('./models/users');

var config=require('./config');

///////////////if you want to use passport-local-mongoose authentication else you can write your own authentication
exports.local=passport.use(new localstratgy(user.authenticate()));

////////////////////function to create and return a json token
exports.getToken=(user)=>{
    return(jwt.sign(user,config["secret-key"],
    {expiresIn:7200}));
}

//////////////////code to retrieve json token from request and verify it
var mytoken={};
mytoken.jwtFromRequest=extractjwt.fromAuthHeaderAsBearerToken();
mytoken.secretOrKey=config["secret-key"];
exports.jwtPassport=passport.use(new jwtStrategy(mytoken,(jwt_payload,done)=>{
    console.log("Payload in JWT TOKEN ",jwt_payload);
    user.findOne({_id:jwt_payload._id},(err,user)=>{
        if(err)
        {
            return done(err,false);
        }
        else if (user)
        {
            return done(null,user);
        }
        else 
        {
            return done(null,false);
        }
    });
}));

/////////////////////////////verify users;
exports.verifyUser=passport.authenticate('jwt',{session:false});

///////////to use session
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

/////////////////////////////verify whether user have admin privileges////////////////
exports.verifyAdmin=((req,res,next)=>{

    //console.log(req.user.admin);
    if(req.user.admin===true)
    {
        console.log("you are admin user");
        next();
    }
    else{
            res.statusCode=403;
            res.setHeader('Content-Type','application/json');
            res.json({status:false,message:"you are not authorized to perform this action,Admin privileges needed"});
    }
});

