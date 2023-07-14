const express = require('express')
const router = express.Router()
const usercontroller=require('../Controller/UserController')
const chatcontroller=require('../Controller/ChatController')
const messagecontroller=require('../Controller/MessageController')
const { VerifyUser } = require('../Middleware/Auth')



router.post('/register',usercontroller.userSignup)
router.post('/userotp',usercontroller.verifyOtp)
router.post('/login',usercontroller.loginUser)
router.get('/isUserAuth',VerifyUser,usercontroller.isUserAuth)
router.get('/getallbanner',usercontroller.getBanners)
router.get('/getallservices',usercontroller.getServices)
router.get('/getallbrands',usercontroller.getBrands)
router.get('/getallmodels',usercontroller.getModels)
router.post('/updatebookingdetails',VerifyUser,usercontroller.updateBookingDetails)
router.get('/getallserviceplans/:id',VerifyUser,usercontroller.getAllServicesList)
router.post('/addtocart/:serviceId/:planId', VerifyUser, usercontroller.addToCart);
 router.post('/deletecartitem/:id',VerifyUser,usercontroller.deleteCartItem)
 router.put('/updateprofile',VerifyUser,usercontroller.EditUserProfile)
 router.put('/updateuserloc',VerifyUser,usercontroller.updateLocation)
 router.get('/getlocations',VerifyUser,usercontroller.allLocations)
 router.get('/getexpertmechanic',VerifyUser,usercontroller.getBrandMechanic)
 router.put('/handlebookingdata',VerifyUser,usercontroller.bookingDataUpdate)
 router.post('/payment',VerifyUser,usercontroller.payment)
 router.post('/verifypayment',VerifyUser,usercontroller.verifyRazorPayment)
 router.get('/getservicdetails',VerifyUser,usercontroller.getserviceDetails)
 router.post('/createchat',VerifyUser,chatcontroller.createChat)
 router.get('/getuserchat/:userid',VerifyUser,chatcontroller.userChat)
 router.get('/getchat/find/:firstId/:secondId',VerifyUser,chatcontroller.findChat)
 router.post('/addmessage',VerifyUser,messagecontroller.addMessage)
 router.get('/getmessage:chatId',VerifyUser,messagecontroller.getMessages)
 router.get('/getmechanicdata/:id',usercontroller.getMechanic)


 



module.exports = router;