var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishesRouter= require('./routes/dish');
var promotionsRouter=require('./routes/promo');
var leaderRouter=require('./routes/leader');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

///connecting to database
const mongoose=require('mongoose');

const url='mongodb://localhost:27017/week2_assignment';
const connect=mongoose.connect(url);
connect.then((db)=>
{
    console.log(`connect to the database successfully`);
})
.catch((err)=>{
    console.log("connectiong to the server failed");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//implement basic authentication with cookies
app.use(cookieParser('12345-67890-09876-54321'));
function auth(req,res,next)
{
  console.log(req.headers);
  if(!req.signedCookies.user)
  {
      var authHeader=req.headers.authorization;
      if(!authHeader)
      {
        var err=new Error('Your are not authenticated');
        res.setHeader('www-authetication','Basic');
        err.statuscode=401;
        next(err);
        return;
      }
      var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      var user=auth[0];
      var password=auth[1];
      if(user==='admin' && password==='password')
      {
        res.cookie('user','admin',{signed: true});
        //res.cookie('user','admin',{signed:true});
        next();
      }
      else
      {
        var err=new Error('Your are not authenticated');
        res.setHeader('www-authetication','Basic');
        err.statuscode=401;
        next(err);
        return;
      }
    }
    else{
      if(req.signedCookies.user==='admin')
      {
        next();
      }
      else
      {
        var err=new Error('Your are not authenticated');
        res.setHeader('www-authotication','Basic');
        err.statuscode=401;
        next(err);
        return;

      }
    }
  }

  

app.use(auth);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishesRouter);
app.use('/promotions',promotionsRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
