const AdminModel = require("../Models/AdminModel");
const MechanicModel = require('../Models/MechanicModel')
const UserModel = require('../Models/UserModel')
const BrandModel=require('../Models/BrandModel')
const ServiceModel=require('../Models/ServicesModel')
const CarsModel=require('../Models/CarsModel')
const cloudinary = require('../config/cloudinary')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BannerModel = require("../Models/BannerModel");
const fs=require('fs');
const ServicelistModel = require("../Models/ServicelistModel");
const maxAge = 3 * 24 * 60 * 60;

// const handleError = (err) => {
//   let errors = { email: "", password: "" };
//   if (err.code === 11000) {
//     errors.email = "email is already registered";
//     return errors;
//   }
//   if (err.message.includes("user validation failed")) {
//     Object.values(err.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message;
//     });
//   }
//   return errors;
// };

const handleErrorManagent = (err) => {
  let errors = { message: "" };

  if (err.code === 11000) {
    errors.message = "the Item is already exists";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((properties) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};

module.exports.adminLogin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    console.log(email, password);
    let admin = await AdminModel.findOne({ email });

    if (admin) {
      let validPassword = await bcrypt.compare(password, admin.password);

      if (validPassword) {
        const adminId=admin._id
        const token = jwt.sign({adminId}, process.env.JWT_SECRET_KEY,{expiresIn:30000});
        console.log(token);

        res
          .status(200)
          .json({ message: "Login Successfull", admin, token, success: true });
      } else {
        const errors = { password: "Incorrect admin password" };
        res.json({ errors, success: false });
      }
    } else {
      const errors = { email: "email does not exist" };
      res.json({ errors, success: false });
    }
  } catch (error) {
    console.log(error);
    const errors = { email: "Incorrect admin email or password" };
    res.json({ errors, success: false });
  }
};

module.exports.isAdminAuth = async (req, res) => {
  try {   
  let admin = await AdminModel.findById(req.adminId)
  

  const admindetails ={
      email: admin.email,
  }
  res.json({"auth":true,"result":admindetails, "status": "success", "message": "signin success" })
  } catch (error) {
      res.status(400).json({"auth":false,"message":error.message})
  }
  

}






module.exports.getAllMechanicDetails = async (req, res, next) => {
  try {
    const mechanic = await MechanicModel.find({})
    console.log(mechanic, "kjhgf")
    res.json({ "status": "success", result: mechanic })
  } catch (error) {
    res.status(400).json({ "status": "error", message: error.message })

  }

}

module.exports.getAllUserDetails = async (req, res, next) => {
  try {
    console.log("helllllooooo");
    const users = await UserModel.find({isBanned:false}).select('-password')
    console.log(users, "userdetails")
    res.json({ "status": "success", result: users })
  } catch (error) {
    res.status(400).json({ "status": "error", message: error.message })

  }

}
module.exports.addNewBrands = async (req, res, next) => {
  try {
    console.log(req.body,"gggxxxxx")
    const { brand, description,basicPay } = req.body
    console.log(req.file,"mmmmm")
    const result= await cloudinary.uploader.upload(req.file.path,{format:'WebP'})
    console.log(result.secure_url,"aaaaaa")
    const brands = await BrandModel.create({ brandName: brand, description: description ,basicPay:basicPay, image:result.secure_url})
    console.log(brands)
    res.status(200).json({ message: "successfully add new Brand", success: true })


  } catch (err) {
      console.log(err)
      const  errors = handleErrorManagent(err);
      res.json({ message:"something went wrong", status: false, errors })
     
  }
    
  }


module.exports.getAllBrands = async (req, res, next) => {
  try {
    console.log("helllllooooo brands");
    const brands = await BrandModel.find({isActive:true})
    console.log(brands, "brandsdata")
    res.json({ success: true, result: brands })
  } catch (error) {
    res.status(400).json({ success:false, message: error.message })

  }

}
module.exports.deleteBrand=async(req,res,next)=>{
  try{
    console.log(req.params.id,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    const brand=req.params.id
    BrandModel.findByIdAndUpdate({_id:brand}, {$set: {isActive: false }}).then((response)=>{
      res.status(200).json({message:"Deleted Successful",success:true})
    })
  }catch(error)
  {
    console.log(error)
    res.json({ message: "Something went wrong", status: false })
  }
}
module.exports.blockUser = async (req, res, next) => {
  let id = req.params.id;
  console.log(id)
  await UserModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        isBanned: true,
      },
    }
  ).then((response)=>{
    res.status(200).json({message:"Banned Successfully",success:true})
  })
}
module.exports.unblockUser = async (req, res, next) => {
  let id = req.params.id;
  console.log(id)
  await UserModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        isBanned: false,
      },
    }
  ).then((response)=>{
    res.status(200).json({message:"Banned Successfully",success:true})
  })
}
module.exports.updateBrand = async (req, res, next) => {
  try {
    console.log(req.body)
    const { id ,brandName, description,basicPay } = req.body
  
    const image= await cloudinary.uploader.upload(req.file.path,{format:'WebP'})
    const brands = await  BrandModel.findByIdAndUpdate({_id:id},{$set:{ brandName: brandName, description: description ,basicPay:basicPay,image:image.secure_url}})
  
    console.log(brands)
    res.status(200).json({ message: "successfully updated the Brand", success: true })


  } catch (err) {

      const  errors = handleErrorManagent(err);
      res.json({ message:"something went wrong", status: false, errors })
     
  }
}
module.exports.addNewServices = async (req, res, next) => {
  try {
    const { serviceName,  price,description } = req.body
    console.log(req.file,"mmmmm")
    const result= await cloudinary.uploader.upload(req.file.path,{format:'WebP'})
    console.log(result.secure_url,"aaaaaa")

    const services = await ServiceModel.create({ serviceName: serviceName, description: description ,image:result.secure_url})
    console.log(services)
    res.status(200).json({ message: "successfully add new service", success: true })


  } catch (err) {

      const  errors = handleErrorManagent(err);
      res.json({ message:"Already existing Data", status: false, errors })
     
  }
    
  }
  module.exports.getAllServices = async (req, res, next) => {
    try {
      console.log("helllllooooo services");
      const services = await ServiceModel.find({status:true})
      console.log(services, "servicedata")
      res.json({ success: true, result:services  })
    } catch (error) {
      res.status(400).json({ success:false, message: error.message })
  
    }
  
  }
  module.exports.updateService = async (req, res, next) => {
    try {
      console.log("updateservice")
      const { id,serviceName, description} = req.body
      const image= await cloudinary.uploader.upload(req.file.path,{format:'WebP'})
      const services  = await  ServiceModel.findByIdAndUpdate({_id:id},{$set:{  serviceName: serviceName, description: description ,image:image.secure_url}})
    
     
      console.log(services)
      res.status(200).json({ message: "successfully updated the Brand", success: true })
  
  
    } catch (err) {
  
        const  errors = handleErrorManagent(err);
        res.json({ message:"something went wrong", status: false, errors })
       
    }
  }
  module.exports.deleteService=async(req,res,next)=>{
    try{
      console.log(req.params.id,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
      const serviceid=req.params.id
      ServiceModel.findByIdAndUpdate({_id:serviceid}, {$set: {status: false }}).then((response)=>{
        res.status(200).json({message:"Deleted Successful",success:true})
      })
    }catch(error)
    {
      console.log(error)
      res.json({ message: "Something went wrong", status: false })
    }
  }
  module.exports.getAllBrandNames=async(req,res,next)=>{
    const brands=await BrandModel.find({isActive:true})
    console.log(brands,"to send to models")
    res.status(200).json({ message: "successfully get all brandnames",result:brands, success: true })
  }
  module.exports.addcarModels = async (req, res, next) => {
    try {
      console.log(req.body)
      const { carName,brandName,fuelType } = req.body
     

      const cars = await CarsModel.create({ carName: carName, brandName:brandName,fuelType:fuelType})
      console.log(cars)
      res.status(200).json({ message: "successfully add cars", success: true })
  
  
    } catch (err) {
      console.log(err)
        const  errors = handleErrorManagent(err);
        res.json({ message:"Already existing Data", status: false, errors })
       
    }
  }  
  module.exports.getAllcarDetails= async (req, res, next) => {
    try {
      console.log("helllllooooo services");
      const cars = await CarsModel.find({status:true}).populate('brandName')
      console.log(cars, "carsdata")
      res.json({ success: true, result:cars  })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success:false, message: error.message })
  
    }
  
  }
  module.exports.deleteCar=async(req,res,next)=>{
    try{
      console.log(req.params.id,"delete car ")
      const carid=req.params.id
      CarsModel.findByIdAndUpdate({_id:carid}, {$set: {status: false }}).then((response)=>{
        res.status(200).json({message:"Deleted Successful",success:true})
      })
    }catch(error)
    {
      console.log(error)
      res.json({ message: "Something went wrong", status: false })
    }
  }
  module.exports.updateCar = async (req, res, next) => {
    try {
      console.log("updatecars",req.body)
      const { carName, brandName,fuelType } = req.body
  
      const cars = await CarsModel.updateOne({ carName: carName, brandName: brandName ,fuelType:fuelType})
      console.log(cars)
      res.status(200).json({ message: "successfully updated the cars", success: true })
  
  
    } catch (err) {
  
        const  errors = handleErrorManagent(err);
        res.json({ message:"something went wrong", status: false, errors })
       
    }
  }
  module.exports.addBanner = async (req, res, next) => {
    try {
      console.log(req.body,"gggxxxxx")
      const {   bannerName,description } = req.body
      const result= await cloudinary.uploader.upload(req.file.path,{format:'WebP'})
      console.log(result.secure_url);
      const banner = await BannerModel.create({ bannerName: bannerName, description: description ,image:result.secure_url})
      console.log(banner)
      res.status(200).json({ message: "successfully add new service", success: true })
      fs.unlinkSync(req.file.path)
  
  
    } catch (err) {
  console.log(err);
        const  errors = handleErrorManagent(err);
        res.json({ message:"Already existing Data", success: false, errors })
       
    }
      
    }
    module.exports.getBanners= async (req, res, next) => {
      try {
        console.log("helllllooooo banners");
        const banners = await BannerModel.find({})
        console.log(banners, "data")
        res.json({ success: true, result:banners  })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success:false, message: error.message })
    
      }
    
    }
    module.exports.updateBanner = async (req, res, next) => {
      try {
        console.log(req.body)
        const {id , bannerName, description } = req.body
        const image= await cloudinary.uploader.upload(req.file.path,{format:'WebP'})
    
        const banner = await BannerModel.findByIdAndUpdate({_id:id},{$set:{ bannerName: bannerName, description: description ,image:image.secure_url}})
        console.log(banner)
        res.status(200).json({ message: "successfully updated the banner", success: true })
    
    
      } catch (err) {
        console.log(err)
          const  errors = handleErrorManagent(err);
          res.json({ message:"something went wrong", status: false, errors })
         
      }
    }
    module.exports.blockBanner = async (req, res, next) => {
      try{
       console.log(req.params.id,"id kitti")
       const id=req.params.id
       console.log(id)
       
       const banner=await BannerModel.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              status: false,
            },
          }
        )
        console.log(banner,"block working")
          res.status(200).json({message:"blocked Successfully",success:true})

      }
     
      catch(err)
      {
        console.log(err)
      }
    }
    module.exports.unblockBanner = async (req, res, next) => {
      try{
        let id=req.params.id
        console.log(id)
       const banner=await BannerModel.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              status: true,
            },
          }
        )
        console.log(banner,"unblock working")
          res.status(200).json({'message':"unblocked Successfully" ,'success':true})

      }
     
      catch(err)
      {
        console.log(err)
      }
    }

    module.exports.getServiceName = async (req, res, next) => {
      try {
        console.log("helllllooooo");
        const services = await ServiceModel.find({status:true})
        console.log(services, "servicedata")
        res.json({ success: true, result:services  })
      } catch (error) {
        res.status(400).json({ success:false, message: error.message })
    
      }
    
    }
    module.exports.addServicesList = async (req, res, next) => {
      try {
        console.log(req.body)
        const { serviceName,descriptionLines,name,price } = req.body
       
  
        const servicelist = await ServicelistModel.create({ serviceName: serviceName,servicelistName:name ,description:descriptionLines,price:price})
        console.log(servicelist)
        res.status(200).json({ message: "successfully added the list", success: true })
    
    
      } catch (err) {
        console.log(err)
          const  errors = handleErrorManagent(err);
          res.json({ message:"something went  wrong", status: false, errors })
         
      }
    } 
    module.exports.getAllServiceList = async (req, res, next) => {
      try {
        console.log("helllllooooo");
        const serviceslist = await ServicelistModel.find()
        console.log(serviceslist, "servicelistata")
        res.json({ success: true, result:serviceslist  })
      } catch (error) {
        res.status(400).json({ success:false, message: error.message })
    
      }
    
    } 
    module.exports.updateServiceList = async (req, res, next) => {
      try {
        
        const { serviceName, name,price,descriptionLines } = req.body
    
        const list = await ServicelistModel.updateOne({ serviceName: serviceName, serviceListName: name ,price:price,description: descriptionLines})
        console.log(list)
        res.status(200).json({ message: "successfully updated the list", success: true })
    
    
      } catch (err) {
    
          const  errors = handleErrorManagent(err);
          res.json({ message:"something went wrong", status: false, errors })
         
      }
    }