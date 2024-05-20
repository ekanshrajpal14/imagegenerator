var express = require('express');
var router = express.Router();
// var popup = require('popups');

var passport = require('passport');
const localStrategy = require('passport-local');
var userModel = require('./users');
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post("/register", async function (req, res) {

  let allusers = [];
  var newUser = new userModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,

  });
  try {
    allusers = await userModel.find({});
  }
  catch (err) { console.log(err); }
  var userExist = false;
  allusers.forEach(function (user) {
    if (user.username == newUser.username) {
      // flash username already exists

      console.log("User Already Exists")

      // popup.alert({
      //   content: 'Hello!'
      // });
      userExist = true;
    }
  });
  if (userExist === false) {
    userModel.register(newUser, req.body.password).then(function (elem) {
      passport.authenticate('local')(req, res, function () {
        res.redirect("/account");
      })
    })
  }
  else {

    res.redirect("/");
  }
});


router.post("/login", passport.authenticate("local", {
  successRedirect: '/account',
  failureRedirect: "/"
}), function (req, res) { });





router.get('/get', function (req, res, next) {
  userModel.find().then(function (users) {
    res.json(users);
  })
});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  })
});


// router.get('/login', function (req, res, next) {
//   res.render('login');
// });

// router.get('/sign', function (req, res, next) {
//   res.render('sign');
// });

router.get('/account', isLoggedIn, function (req, res, next) {
  res.render('account');
});
router.post('/addcollection/image', isLoggedIn, function (req, res, next) {
  var url = req.body.inputs;
  console.log(url);
  userModel.findOne({ username: req.session.passport.user }).then(function (user) {
    user.likedpics.push(url);
    user.save().then(function () {
      res.json("done");
    })
  })
});

router.get('/history/:data', isLoggedIn, function (req, res, next) {
  var data = req.params.data;
  userModel.findOne({ username: req.session.passport.user }).then(function (user) {
    user.history.push(data);
    user.save().then(function () {
      res.json("history updated");
    })
  })
});

router.get("/history", isLoggedIn, function (req, res) {
  userModel.findOne({ username: req.session.passport.user }).populate("history").then(function (user) {
    res.render("history", { user });
  })
})



router.get("/remove/:str", isLoggedIn, function (req, res) {
  userModel.findOne({ username: req.session.passport.user }).populate("history").then(function (user) {
    var str = req.params.str;
    var index = user.history.indexOf(str);
    user.history.splice(index, 1);
    user.save().then(function () {
      res.redirect("/history");
    })
  })
})
router.get("/delete/:id", isLoggedIn, function (req, res) {
  userModel.findOne({ username: req.session.passport.user }).populate("likedpics").then(function (user) {
    var id = req.params.id;
    // var index = user.history.indexOf(str);
    user.likedpics.splice(id, 1);
    user.save().then(function () {
      res.redirect("/collection");
    })
  })
})
router.get("/collection", isLoggedIn, function (req, res) {
  userModel.findOne({ username: req.session.passport.user }).populate("likedpics").then(function (user) {
    res.render("collection", { user });
  })
})

router.get("/about",(req,res)=>{
  res.render("about");
})
// router.get("/del",function(req,res){
//   userModel.findOne({username:"ekansh"}).then(function(user){
//     user.likedpics = [];
//     user.save().then(function(){
//       res.redirect("/get");
//     })
//   })
// })
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();

  }
  else {
    res.redirect("/");
  }
}






module.exports = router;
