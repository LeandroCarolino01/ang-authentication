const express = require('express')
const router = express.Router()
const User = require('../models/user')

const mongoose = require('mongoose')
const e = require('express')
const db = 'mongodb://leandro:Wrestling26@ds041484.mlab.com:41484/eventsdb'




mongoose.connect(db, err => {
    if(err) {
        console.log('Error'+ err)
    } else {
        console.log('Connected to Mongo')
    }
})

router.get('/', (req, res) => {
    res.send('From api route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

module.exports = router;