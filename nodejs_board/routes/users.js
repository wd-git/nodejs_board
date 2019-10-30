var express = require('express');
var router = express.Router();
var user = require('../models/user.js');

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

module.exports = router;
