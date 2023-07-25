const express = require('express')
const router = express.Router()
const mechaniccontroller=require('../Controller/Mechaniccontroller')
const { VerifyMechanic } = require('../Middleware/Auth')
const {upload}= require('../Middleware/Multer')
const chatcontroller=require('../Controller/ChatController')
const messagecontroller=require('../Controller/MessageController')
router.post('/register',mechaniccontroller.mechanicregister)
router.post('/verifyOtp',mechaniccontroller.verifyOtp)
router.put('/updatedetails', upload.fields([ { name: 'certificate', maxCount: 1 }]),mechaniccontroller.updateDetails);
router.post('/login',mechaniccontroller.mechanicLogin)
router.get('/isMechanicAuth',VerifyMechanic,mechaniccontroller.isMechanicAuth)
router.get('/getallbrands',mechaniccontroller.getAllBrands)
router.put('/updateprofile',VerifyMechanic, upload.fields([{ name: 'profileImage', maxCount: 1 }, ]),mechaniccontroller.updateProfile);
router.post('/savemechanicslots',VerifyMechanic,mechaniccontroller.addmechanicSlots)
//router.post('/createchat',VerifyMechanic,chatcontroller.createChat)
router.get('/getmechanicchat/:userid',VerifyMechanic,chatcontroller.userChat)
 router.get('/getchat/find/:firstId/:secondId',VerifyMechanic,chatcontroller.findChat)
 router.post('/addmessage',VerifyMechanic,messagecontroller.addMessage)
 router.get('/getmessage/:chatId',VerifyMechanic,messagecontroller.getMessages)
 router.get('/getuserdata/:id',VerifyMechanic,mechaniccontroller.getUser)
 router.get('/getservicedetails',VerifyMechanic,mechaniccontroller.getBookingDetails)
 router.put('/updatebookingstatus',VerifyMechanic,mechaniccontroller.updateBookingStatus)


module.exports = router;