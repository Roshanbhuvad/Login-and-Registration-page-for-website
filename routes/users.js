var express = require("express");
//var expressValidator = require('express-validator');
var router = express.Router();
const { check, validationResult } = require("express-validator");
var expressValidator = require("express-validator");
var multer = require("multer"); //We have added additional libraries after typed express in cmd to setup REST API environment
var upload = multer({ dest: "./uploads" });
var LocalStrategy = require("passport-local").Strategy;
var passport = require('passport');

var User = require("../models/user");

//var app = express();
// add validation methods to request
//app.use(expressValidator());

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register" });
});
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});


router.post("/login",
  passport.authenticate('local', {failureRedirect:'/users/login', failureFlash: 'Invalid username or password'}),


})
router.post("/register", upload.single("profileimage"), function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;

  check("name", "Name field is required").notEmpty();
  check("email", "Email field is required").notEmpty();
  check("email", "Email is not valid").isEmail();
  check("username", "Username field is required ").notEmpty();
  check("password", "Password field is required").notEmpty();
  check("password2", "Passwords do not match").equals(req.body.password);

  // form validator

  // Check errors
  var errors = validationResult(req);

  if (errors) {
    res.render("register", {
      errors: errors,
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage,
    });

    //This below createUser we are getting from the models/user.js file which is mentioned as a module.exports
    User.createUser(newUser, function (err, user) {
      if (err) throw err;
      console.log(user);
    });
    req.flash("success", "You are now registered and can login");

    res.location("/");
    res.redirect("/");
  }
});

module.exports = router;
