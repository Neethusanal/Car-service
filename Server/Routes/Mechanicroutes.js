const express = require('express')
const router = express.Router()
const mechaniccontroller=require('../Controller/Mechaniccontroller')
const { VerifyMechanic } = require('../Middleware/Auth')
const {upload}= require('../Middleware/Multer')
router.post('/register',mechaniccontroller.mechanicregister)
router.post('/verifyOtp',mechaniccontroller.verifyOtp)
router.put('/updatedetails', upload.fields([ { name: 'certificate', maxCount: 1 }]),mechaniccontroller.updateDetails);
router.post('/login',mechaniccontroller.mechanicLogin)
router.get('/isMechanicAuth',VerifyMechanic,mechaniccontroller.isMechanicAuth)
router.get('/getallbrands',mechaniccontroller.getAllBrands)
router.put('/updateprofile',VerifyMechanic, upload.fields([{ name: 'profileImage', maxCount: 1 }, ]),mechaniccontroller.updateProfile);
router.post('/savemechanicslots',VerifyMechanic,mechaniccontroller.addmechanicSlots)
module.exports = router;