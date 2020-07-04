var createError = require("http-errors");
var express = require("express");
var path = require("path");

//var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session"); //We have added additional libraries after typed express in cmd to setup REST API environment
var passport = require("passport"); //We have added additional libraries after typed express in cmd to setup REST API environment
const expressValidator = require("express-validator");

//api.use(expressValidator());
const { check, validationResult } = require("express-validator");

var LocalStrategy = require("passport-local").Strategy; //We have added additional libraries after typed express in cmd to setup REST API environment
var multer = require("multer"); //We have added additional libraries after typed express in cmd to setup REST API environment
var upload = multer({ dest: "./uploads" });
var messages = require("express-messages");
var flash = require("connect-flash"); //We have added additional libraries after typed express in cmd to setup REST API environment
var mongo = require("mongodb"); //We have added additional libraries after typed express in cmd to setup REST API environment
var mongoose = require("mongoose"); //We have added additional libraries after typed express in cmd to setup REST API environment
//var db = mongoose.connection;
var db = mongoose.connection;
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const validatorOptions = {};
//app.use(expressValidator(middlewareOptions));
// this line must be after any of the bodyParser

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//Handle File uploads
//We have added this new syntax to use the multer for handling file uploads

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//Handle Sessions
app.use(
  session({
    //We have added this new syntax to use the express-session for handling sessions
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    useNewUrlParser: true,
  })
);

// Passport for handling authentication
app.use(passport.initialize()); //We have added these new syntax to use the passport authentication
app.use(passport.session());

// Validator

// app.use(
//   expressValidator({
//     errorFormatter: function (param, msg, value) {
//       var namespace = param.split("."),
//         root = namespace.shift(),
//         formParam = root;

//       while (namespace.length) {
//         formParam += "[" + namespace.shift() + "]";
//       }
//       return {
//         param: formParam,
//         msg: msg,
//         value: value,
//       };
//     },
//   })
// );

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//connect-flash(middleware for messages)
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
/*app.use(function (req, res, next) {
  next(createError(404));
}); */

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
