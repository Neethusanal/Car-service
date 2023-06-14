const express = require('express')
const router = express.Router()
const usercontroller=require('../Controller/UserController')
const { VerifyUser } = require('../Middleware/Auth')



router.post('/register',usercontroller.userSignup)
router.post('/userotp',usercontroller.verifyOtp)
router.post('/login',usercontroller.loginUser)
router.get('/isUserAuth',VerifyUser,usercontroller.isUserAuth)
router.get('/getallbanner',VerifyUser,usercontroller.getBanners)
router.get('/getallservices',VerifyUser,usercontroller.getServices)




module.exports = router;