var express = require('express');
const bodyParser = require('body-parser');

var User=require('../models/users');

var passport=require('passport');
var router = express.Router();
router.use(bodyParser.json());
var authenticate=require('../authenticate');
//////////////New user signup 

router.post('/signup',(req,res,next)=>{
  User.register( new User ({username:req.body.username}),req.body.password,(err,user)=>{
    if(err)
    {
      res.statusCode=400;
      res.header('Content-Type','application/Type');
      res.json ({success:false,message:err});
    }
    else
    { 
      passport.authenticate('local')(req,res,()=>{
          res.statusCode=200;
        res.header('Content-Type','application/Type');
        res.json ({success:true,message:"user created successfully"});
      });
      

    }
  });
});  
router.post('/login',passport.authenticate('local'),(req,res,next)=>{
 
  var token=authenticate.getToken({_id:req.user._id});
  res.statusCode=200;
  res.setHeader("Content-Type",'application/json');
  res.json({success:true,token:token,message:"you are authenticated"});
});
  
router.get('/logout',(req,res,next)=>{
    if(req.session.user)
    {
      req.session.destroy();
      res.clearCookie('session-id');
      res.redirect('/');

    }
    else{
      var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
    }
})
module.exports = router;
