const express = require('express')
const app = express()
const router = express.Router()
var user = require('../models/user.js');

//login 

router.get('/login', function(req, res, next) {
  //nothing
});

router.post("/login", async function(req, res, next){
  let body = req.body;

  let result = await user.findOne({
    where: {
      email : body.userEmail
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    console.log("비밀번호 일치");
    res.redirect("/users");
  }
  else{
    console.log("비밀번호 불일치");
    res.redirect("/users/login");
  }
});

// member join
router.route('/signup').get(function(req, res, next) {
    res.render("user/signup");
})

router.route('/signup').post(function(req, res, next) {
    let body = req.body;

    user.create({
      
      name: body.userName,
      email: body.userEmail,
      password: body.password
    })
    .then( result => {
      res.redirect("/user/signup");
    })
    .catch( err => {
      console.log(err)
    })
  })



module.exports = router