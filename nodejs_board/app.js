var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var crypto = require('crypto');

var passport = require("passport");
var setUpPassport = require("./setuppassport");
// session setting

var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/UserRouter');

var app = express();
var User = require('./models/user.js');

/**
 *	MongoDB setup use : mongoose
 */

//mongodb 
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let mongoDB = 'mongodb://mydb:1234@15.164.224.3:27017/board'
let promise = mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

promise.then(
  () => { console.log('db is connected') },
  err => { console.log('cannot connect to db')}
)

// add model
//module.exports = mongoose.model('user', user);

//body-Parser 
let bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret:"SDMKLMLKWQMELKMKLRJKL^&%@^&#@", // 임의의 문자로 인코딩 -> 암호화
  resave:true,
  saveUninitialized:true
}));
app.use()
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

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

// 강제종료시 포트 닫기
process.on('SIGINT', function() {
  console.log("Caught interrupt signal");
  gracfulCleanJob().then(() => {
      process.exit();
  })
});
