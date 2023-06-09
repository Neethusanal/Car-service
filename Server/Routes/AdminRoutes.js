const express = require('express')
const router = express.Router()
const admincontroller=require("../Controller/AdminController")
const {upload}= require('../Middleware/Multer')

router.post('/login',admincontroller.adminLogin)
router.get('/getallmechanic',admincontroller.getAllMechanicDetails)
router.get('/getallusers',admincontroller.getAllUserDetails)
router.post('/addbrands',upload.single('image'),admincontroller.addNewBrands)
router.get('/getallbrands',admincontroller.getAllBrands)
router.post('/deletebrands/:id',admincontroller.deleteBrand)
router.put('/blockuser/:id',admincontroller.blockUser)
router.put('/unblockuser/:id',admincontroller.unblockUser)
router.put('/updatebrand',upload.single('image'),admincontroller.updateBrand)
router.post('/addservices',upload.single('image'),admincontroller.addNewServices)
router.get('/getallservices',admincontroller.getAllServices)
router.put('/updateservice' ,upload.single('image'),admincontroller.updateService)
router.post('/deleteservice/:id',admincontroller.deleteService)
router.get('/getallbrandNames',admincontroller.getAllBrandNames)
 router.post('/addcarModels',admincontroller.addcarModels)

 router.get('/getallcars',admincontroller.getAllcarDetails)
 router.post('/deletecar/:id',admincontroller.deleteCar)
router.put('/updatecars',admincontroller.updateCar)
router.post('/addbanner',upload.single('image'),admincontroller.addBanner)
router.get('/getallbanner',admincontroller.getBanners)
router.put('/updatebanner',upload.single('image'),admincontroller.updateBanner)
router.put('/blockbanner/:id',admincontroller.blockBanner)
router.put('/unblockbanner/:id',admincontroller.unblockBanner)



module.exports = router;