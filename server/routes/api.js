const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

const mongoose = require('mongoose')
const e = require('express')
const user = require('../models/user')
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
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if(error) {
            console.log(error)
        } else {
            if(!user){
                res.status(401).send('invalid email')
            } else 
            if( user.password !== userData.password){
                res.status(401).send('Invalid password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

router.get('/special', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "auto Expo",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

module.exports = router;