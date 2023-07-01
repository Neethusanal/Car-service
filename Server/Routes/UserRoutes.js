const express = require('express')
const router = express.Router()
const usercontroller=require('../Controller/UserController')
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
router.get('/getallserviceplans/:id',usercontroller.getAllServicesList)
router.post('/addtocart/:serviceId/:planId', VerifyUser, usercontroller.addToCart);
 router.post('/deletecartitem/:id',VerifyUser,usercontroller.deleteCartItem)
 router.put('/updateprofile',VerifyUser,usercontroller.EditUserProfile)
 router.put('/updateuserloc',VerifyUser,usercontroller.updateLocation)
 router.get('/getlocations',VerifyUser,usercontroller.allLocations)
 router.get('/getexpertmechanic',VerifyUser,usercontroller.getBrandMechanic)
//  router.get('/availableslots',VerifyUser,usercontroller.slotsAvailable)




module.exports = router;