const express = require('express')
const router = express.Router()
const mechaniccontroller=require('../Controller/Mechaniccontroller')
const { VerifyMechanic } = require('../Middleware/Auth')
const {upload}= require('../Middleware/Multer')
router.post('/register',mechaniccontroller.mechanicregister)
router.post('/verifyOtp',mechaniccontroller.verifyOtp)
router.post('/login',mechaniccontroller.mechanicLogin)
router.get('/isMechanicAuth',VerifyMechanic,mechaniccontroller.isMechanicAuth)
router.get('/getallbrands',mechaniccontroller.getAllBrands)
router.put('/updateprofile',VerifyMechanic, upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'certificate', maxCount: 1 }]),mechaniccontroller.updateProfile);

module.exports = router;