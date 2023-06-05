const express = require('express')
const router = express.Router()
const mechaniccontroller=require('../Controller/Mechaniccontroller')
router.post('/register',mechaniccontroller.mechanicregister)
router.post('/verifyOtp',mechaniccontroller.verifyOtp)
router.post('/login',mechaniccontroller.mechanicLogin)
module.exports = router;