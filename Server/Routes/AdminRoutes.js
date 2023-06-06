const express = require('express')
const router = express.Router()
const admincontroller=require("../Controller/AdminController")

router.post('/login',admincontroller.adminLogin)
router.get('/getallmechanic',admincontroller.getAllMechanicDetails)
router.get('/getallusers',admincontroller.getAllUserDetails)
router.post('/addbrands',admincontroller.addNewBrands)
router.get('/getallbrands',admincontroller.getAllBrands)
router.post('/deletebrands/:id',admincontroller.deleteBrand)
router.put('/blockuser/:id',admincontroller.blockUser)
router.put('/unblockuser/:id',admincontroller.unblockUser)
router.put('/updatebrand',admincontroller.updateBrand)
router.post('/addservices',admincontroller.addNewServices)
router.get('/getallservices',admincontroller.getAllServices)
router.put('/updateservice',admincontroller.updateService)
router.post('/deleteservice/:id',admincontroller.deleteService)
router.get('/getallbrandNames',admincontroller.getAllBrandNames)
 router.post('/addcarModels',admincontroller.addcarModels)






module.exports = router;