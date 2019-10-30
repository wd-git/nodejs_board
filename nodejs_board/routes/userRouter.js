const express = require('express')
const app = express()
const router = express.Router()
var user = require('../models/user.js');

// member join
router.route('join').get(function(req, res, next) {
    res.render("user/signup");
})

router.route('join').post(function(req, res, next) {
    let body = req.body;

    user.create({
      name: body.userName,
      email: body.userEmail,
      password: body.password
    })
    .then( result => {
      res.redirect("/users/sign_up");
    })
    .catch( err => {
      console.log(err)
    })
  })



module.exports = router