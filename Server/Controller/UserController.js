const UserModel = require("../Models/UserModel");
const BannerModel = require("../Models/BannerModel");
const ServicesModel = require("../Models/ServicesModel");
const BrandModel = require("../Models/BrandModel");
const CarsModel = require("../Models/CarsModel");
const ServicelistModel = require("../Models/ServicelistModel");
const LocationModel = require("../Models/LocationModel");
const MechanicModel=require("../Models/MechanicModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const nodemailer = require("nodemailer");
const { sendEmailOTP } = require("../Middleware/Nodemailer");
const mongoose = require('mongoose');


const handleError = (err) => {
  let errors = { email: "", password: "" };
  if (err.code === 11000) {
    errors.email = "email is already registered";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

let userData;
let emailOtp;
module.exports.userSignup = async (req, res, next) => {
  console.log(req.body);
  try {
    let { name, email, mobile, password } = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({ email });
    console.log(user, "user");
    if (!user) {
      userData = {
        name,
        email,
        password,
        mobile,
      };
      const otpEmail = Math.floor(1000 + Math.random() * 9000);
      console.log(otpEmail, "4");
      emailOtp = otpEmail;

      sendEmailOTP(email, otpEmail)
        .then((info) => {
          console.log(`Message sent: ${info.messageId}`);
          console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        })
        .catch((error) => {
          throw error;
        });
      res.status(200).json({
        message: "OTP is send to given email ",
        otpSend: true,
      });
    } else {
      res.status(200).json({
        message: "Already user exist with this email",
        otpSend: false,
      });
    }
  } catch (error) {
    console.log(error);
    const errors = handleError(error);
    res.status(400).json({ errors, otpSend: false });
  }
};
module.exports.verifyOtp = async (req, res, next) => {
  try {
    let { otp } = req.body;
    console.log(otp, "otp recieved");
    console.log(userData);
    let { name, email, password, mobile } = userData;
    console.log(name);
    if (otp == emailOtp) {
      console.log("here verify", userData);
      let hashpassword = await bcrypt.hash(password, 10);

      let userdetails = await UserModel.create({
        name,
        email,
        mobile,
        password: hashpassword,
      });
      res
        .status(200)
        .json({
          success: true,
          message: "Successfully registered",
          userdetails,
          created: true,
        });
    } else {
      res.status(400).json({
        success: false,
        message: "Entered OTP from email is incorrect",
        created: false,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        success: false,
        message: "Entered OTP from email is incorrect",
        created: false,
      });
  }
};
module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await UserModel.findOne({ email });
    console.log("user", user);
    if (user) {
      const validpassword =  bcrypt.compare(password, user.password);
      if (validpassword) {
        const userId = user._id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
          expiresIn: maxAge,
        });
        console.log(token, "token");
        res
          .status(200)
          .json({ message: "Login Successfull", user, token, success: true });
      } else {
        const errors = { message: "incorrect password" };
        res.json({ errors, success: false });
      }
    } else {
      const errors = { message: "email does not exist" };
      res.json({ errors, success: false });
    }
  } catch (error) {
    console.log(error);
    const errors = { message: "Incorrect admin email or password" };
    res.json({ errors, success: false });
  }
};
module.exports.isUserAuth = async (req, res) => {
  try {
    let userDetails = await UserModel.findById(req.userId).populate({
      path: "cart",
    });
    userDetails.auth = true;

    res.json({
      auth: true,
      _id: userDetails._id,
      mobile: userDetails.mobile,
      name: userDetails.name,
      email: userDetails.email,
      address:userDetails.address,
      cart: userDetails.cart,
      servicelocation:userDetails?.servicelocation ||null,
      brand:userDetails?.brand,
      model:userDetails?.model,
      cartTotal:userDetails?.cartTotal

    });
  } catch (error) {
    res.json({ auth: false, status: "error", message: error.message });
  }
};
module.exports.getBanners = async (req, res, next) => {
  try {
    const banners = await BannerModel.find({ status: true });
    res.json({ success: true, result: banners });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.getServices = async (req, res) => {
  try {
    const services = await ServicesModel.find({ status: true });
    res.json({ success: true, result: services });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.getBrands = async (req, res) => {
  try {
   
    const brands = await BrandModel.find();
    res.json({ success: true, result: brands });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.getModels = async (req, res) => {
  try {
    const cars = await CarsModel.find();
    res.json({ success: true, result: cars });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.getAllServicesList = async (req, res) => {
  try {
    let id = req.params.id;
    const servicelist = await ServicelistModel.find({ serviceName: id });
    res.json({ success: true, result: servicelist });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.addToCart = async (req, res) => {
  const serviceId = req.params.serviceId;
  const planId = req.params.planId;
  const userId = req.userId;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
     
      const service = await ServicesModel.findById(serviceId);
      if (!service) {
        return res.status(400).json({ message: "Service does not exist" });
      }
      const plan = await ServicelistModel.findById(planId);
      if (!plan) {
        return res.status(400).json({ message: "Plan does not exist" });
      } else {
        console.log(plan)
        const brandserved= user.brand
        console.log(brandserved,"brand")
        // Calculate the basic pay based on the brand
        const brandData = await BrandModel.findOne({brandName:brandserved});
        if (!brandData) {
          return res.status(400).json({ message: "Brand does not exist" });
        }
        const basicPay = brandData.basicPay;
        console.log(basicPay)
        let cartTotal = 0;
        // Calculate the total sum
        const totalSum = basicPay + plan.price;
        cartTotal+=totalSum
        console.log(cartTotal)

        const cart = await UserModel.findByIdAndUpdate(
          { _id: userId },
          {
            $set: { cart: planId, serviceId},
            $push: { bookedservices: planId, serviceId },
            cartTotal:cartTotal
          },
          { new: true }
        );

        console.log(cart);

        return res.status(200).json({
          message: "Service has been added to the cart successfully",
          success: true,
          totalSum:  cartTotal,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// module.exports.addToCart = async (req, res) => {
//   const serviceId = req.params.serviceId;
//   const planId = req.params.planId;
//   const userId = req.userId;

//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     } else {
//       const service = await ServicesModel.findById(serviceId);
// if (!service) {
//   return res.status(400).json({ message: "Service does not exist" });
// }
//       const plan = await ServicelistModel.findById(planId);
//       if (!plan) {
//         return res.status(400).json({ message: "Plan does not exist" });
//       } else {
//         const cart = await UserModel.findByIdAndUpdate(
//           { _id: userId },
//           { $set: { cart: planId,serviceId}},
//           {$push: {bookedservices: planId, serviceId }},
//           { new: true }
//         );
    
//         console.log(cart);

//         return res.status(200).json({
//           message: "Service has been added to the cart successfully",
//           success: true,
//         });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };


module.exports.deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    let cart = await UserModel.updateOne(
      { _id: req.userId },
      { $pull: { cart: id } }
    );
    console.log(cart);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};
module.exports.EditUserProfile = async (req, res) => {
  try {
    const { address, email,} = req.body;
    const user = await UserModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          address: address,
         
        },
      }
    );
    res.status(200).json({ message: "successfully updated ", success: true });
  } catch (err) {
    const errors = handleErrorManagent(err);
    res.json({ message: "something went wrong", status: false, errors });
  }
};
module.exports.allLocations = async (req, res) => {
  try {
    const loc= await LocationModel.find()
    res.json({ success: true, result:loc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.updateLocation= async (req, res) => {
  try {
    const {  email,locationName} = req.body;
    const user = await UserModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          servicelocation: locationName,
         
        },
      }
    );
    res.status(200).json({ message: "successfully updated ", success: true });
  } catch (err) {
    const errors = handleErrorManagent(err);
    res.json({ message: "something went wrong", status: false, errors });
  }
};

module.exports.updateBookingDetails= async (req, res) => {
  try {
    console.log(req.body,"details coming from bookan appointment")
    const { brandName,modelName} = req.body;
    console.log(req.userId)
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.userId},
      {
        $set: {
          brand: brandName,
          model:modelName
         
        },
      }
    );
    res.status(200).json({ message: "successfully updated ", success: true });
  } catch (err) {
    const errors = handleErrorManagent(err);
    res.json({ message: "something went wrong", status: false, errors });
  }
};


module.exports.getBrandMechanic = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId, 'brand');

    const userBrand = user.brand;
    console.log(userBrand);

    const mechanics = await MechanicModel.aggregate([
      {
        $lookup: {
          from: 'brands', // Collection name of BrandModel
          localField: 'brandsserved',
          foreignField: '_id',
          as: 'brand',
        },
      },
      {
        $match: {
          'brand.brandName': userBrand,
        },
      },
    ]);
   
    console.log(mechanics);
    res.json({ success: true, result: mechanics });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.bookingDataUpdate= async (req, res) => {
  try {
    console.log(req.body)
    const {selectedSlot,selectedAddress} = req.body;
    console.log(req.userId)
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.userId},
      {
        $set: {
          bookedSlots: selectedSlot,
          bookedAddress:selectedAddress
         
        },
      }
    );
    res.status(200).json({ message: "successfully updated ", success: true });
  } catch (err) {
    const errors = handleErrorManagent(err);
    res.json({ message: "something went wrong", status: false, errors });
  }
};


