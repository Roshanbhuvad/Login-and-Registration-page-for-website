const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

mongoose.connect("mongodb://localhost:27017/nodeauth", {
  useNewUrlParser: true, //in latest version of mongoose we have to pass this 2nd option useNewUrlParser as true
});

var db = mongoose.connection;

//User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    required: "This field is required.",
    index: true
  },
  password: {
    type: String,
    required: "This field is required.",
  },
  email: {
    type: String,
    required: "This field is required.",
  },
  name: {
    type: String,
    required: "This field is required.",
  },
  profileimage: {
    type: String,
  },
});

var User = (module.exports = mongoose.model("users", UserSchema));

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function (newUser, callback) {
  var query = {username: username};
  User.findOne(query, callback);

}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    callback(null, isMatch);
  });
} 

module.exports.createUser= function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
  
}