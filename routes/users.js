var express = require('express');
const bodyParser = require('body-parser');

var User=require('../models/users');

var router = express.Router();
router.use(bodyParser.json());
//////////////New user signup 

router.post('/signup',(req,res,next)=>{
  User.findOne({username:req.body.username})
  .then((user)=>{
      if(user!=null)
      {
        var err=new Error("User "+req.body.user+" already exist");
        err.status=403;
        next(err);
      }
      else{
          User.create({
            username:req.body.username,
            password:req.body.password

          })
          .then((user)=>{
              if(user)
              {
                res.statusCode=200;
                res.header('Content-Type','application/Type');
                res.end("user created successfully");
              }
              else{
                res.statusCode=400;
                res.header('Content-Type','application/Type');
                res.end ("user creation failed");
              }
              
          })
          .catch((err)=>{
          
            next(err);
          })
      }
  })
  .catch((err)=>{
    next(err);
  })
});

router.post('/login',(req,res,next)=>{
    console.log(req.headers.authorization);
    console.log("header");
    if(!req.session.user)
    {
    
      var authHeader = req.headers.authorization;
        if(!authHeader)
        {
            var err=new Error("You are not authenticated user");
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
            
        }
        console.log("headkker");
        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];
        console.log(username);
        console.log(password);
        User.findOne({username:username})
        .then((user)=>{
          console.log(user);
          console.log(user.username);
          console.log(user.password);
          if(user==null)
          {
           
              var err=new Error(user +" does not exist");
              err.status=401;
              next(err);
          }
          else if(user.password !==password)
          { 
          
            var err=new Error(passowrd +" is not valid");
            err.status=401;
            next(err);
          }
          else if(user.username === username && user.password===password)
          {

             req.session.user='authenticated';
              res.statusCode=200;
              res.setHeader("Content-Type",'application/json');
              res.end("you are authenticated");
              
          }
        })
        .catch((err)=>{
          next(err);
        })
        
    }
    else{
    
        res.statusCode=200;
        res.header('Content-Type','application/json');
        res.end("you are already athenticated");
    }

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
