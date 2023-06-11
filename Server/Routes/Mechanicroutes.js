const express = require('express')
const router = express.Router()
const mechaniccontroller=require('../Controller/Mechaniccontroller')
const { VerifyMechanic } = require('../Middleware/Auth')
router.post('/register',mechaniccontroller.mechanicregister)
router.post('/verifyOtp',mechaniccontroller.verifyOtp)
router.post('/login',mechaniccontroller.mechanicLogin)
router.get('/isMechanicAuth',VerifyMechanic,mechaniccontroller.isMechanicAuth)

module.exports = router;