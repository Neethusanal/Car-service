const express = require('express')
const router = express.Router()
const usercontroller=require('../Controller/UserController')
const {VerifyUser}=require('../Middleware/AuthUser')


router.post('/register',usercontroller.userSignup)
router.post('/userotp',usercontroller.verifyOtp)
router.post('/login',usercontroller.loginUser)
router.post('/',VerifyUser)

module.exports = router;