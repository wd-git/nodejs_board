const express = require('express')
const app = express()
const router = express.Router()

const User = require('../models/user')

// member join
router.route('join').post(function(req, res) {
    const User = new User(req.body)
    User.save()
        .then(User => {
            res.status(200).json({ 'User' : 'User joined successfully'})
        }).catch(err => {
            res.status(200).send('fail to save the User into database')
        })
})


module.exports = router