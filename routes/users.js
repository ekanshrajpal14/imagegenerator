const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
// const { MongoClient, ServerApiVersion } = require('mongodb');

const dotenv = require('dotenv').config();

// mongoose.connect("mongodb://0.0.0.0:27017/AIImage").then(function () {
  //   console.log("connect");
  // });
  
  
  // mongoose.set("strictQuery", false)
  
  mongoose.connect(process.env.database).then(function () {
    console.log("connect");
  }).catch(err => {
    console.log("no connect" + err);
  })


const passportlm = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
  name: String,
  username: String,
  passport: String,
  email: String,
  userdp: String,
  isadmin: {
    type: Boolean,
    default: false
  },
  likedpics: [{
    type: String,
  }],
  history:[{
    type: String,
  }],
  
  pic: {
    type: String,
    default: ""
  },
  

});

userSchema.plugin(passportlm);
module.exports = mongoose.model("user", userSchema);
