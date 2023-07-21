const UserModel = require("../Models/UserModel");
const BannerModel = require("../Models/BannerModel");
const ServicesModel = require("../Models/ServicesModel");
const BrandModel = require("../Models/BrandModel");
const CarsModel = require("../Models/CarsModel");
const ServicelistModel = require("../Models/ServicelistModel");
const LocationModel = require("../Models/LocationModel");
const MechanicModel=require("../Models/MechanicModel")
const BookingModel=require("../Models/BookingModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require('crypto')
const maxAge = 3 * 24 * 60 * 60;
const nodemailer = require("nodemailer");
const { sendEmailOTP } = require("../Middleware/Nodemailer");
const mongoose = require('mongoose');
const Razorpay=require('razorpay');
const ChatModel = require("../Models/ChatModel");
const ReviewModel = require("../Models/ReviewModel");
const key_id=process.env.KEY_ID
const key_secret=process.env.KEY_SECRET


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
        const token = jwt.sign({ userId,role:"user" }, process.env.JWT_SECRET_KEY, {
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
      id: userDetails.id,
      mobile: userDetails.mobile,
      name: userDetails.name,
      email: userDetails.email,
      address:userDetails.address,
      cart: userDetails.cart,
      servicelocation:userDetails?.servicelocation ||null,
      brand:userDetails?.brand,
      model:userDetails?.model,
      cartTotal:userDetails?.cartTotal,
      bookedSlots:userDetails?.bookedSlots,
      bookedservices:userDetails?.bookedservices

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
//       if (!service) {
//         return res.status(400).json({ message: "Service does not exist" });
//       }
//       const plan = await ServicelistModel.findById(planId);
//       if (!plan) {
//         return res.status(400).json({ message: "Plan does not exist" });
//       } else {
//         console.log(plan)
//         const brandserved= user.brand
//         console.log(brandserved,"brand")
//         // Calculate the basic pay based on the brand
//         const brandData = await BrandModel.findOne({brandName:brandserved});
//         if (!brandData) {
//           return res.status(400).json({ message: "Brand does not exist" });
//         }
//         const basicPay = brandData.basicPay;
//         console.log(basicPay)
//         let cartTotal = 0;
//         // Calculate the total sum
//         const totalSum = basicPay + plan.price;
//         cartTotal+=totalSum
//         console.log(cartTotal)

//         const cart = await UserModel.findByIdAndUpdate(
//           { _id: userId },
//           {
//             $set: { cart: planId, serviceId},
//             $addToSet: { bookedservices: plan.servicelistName },
//             cartTotal:cartTotal
//           },
//           { new: true }
//         );

//         console.log(cart);

//         return res.status(200).json({
//           message: "Service has been added to the cart successfully",
//           success: true,
//           totalSum:  cartTotal,
//           basicPay:basicPay
//         });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

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
        const brandserved = user.brand;
        const brandData = await BrandModel.findOne({ brandName: brandserved });
        if (!brandData) {
          return res.status(400).json({ message: "Brand does not exist" });
        }
        const basicPay = brandData.basicPay;
        let cartTotal =  0; // Get the current cart total or set it to 0 if it doesn't exist

        // Remove previously selected plans for the same service from the cart
        await UserModel.findByIdAndUpdate(userId, { $pull: { cart:  planId  } });

        // Calculate the total sum
        const totalSum = basicPay + plan.price;
        cartTotal += totalSum;

        const cart = await UserModel.findByIdAndUpdate(
          { _id: userId },
          {
            $push: { cart: planId  },
            $addToSet: { bookedservices: plan.servicelistName },
            cartTotal: cartTotal,
            basicPay:basicPay
          },
          { new: true }
        ).populate("cart");

        return res.status(200).json({
          message: "Service has been added to the cart successfully",
          success: true,
          result: cart,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



module.exports.deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    let item=await ServicelistModel.findById({_id:id}) 
    console.log(item,"ittteeemmm")
    let cartdata = await UserModel.findByIdAndUpdate(
      { _id: req.userId },
      { $pull: { cart: id } } ,
      
     
      
     
    );
    const cart=await UserModel.findById({_id: req.userId }).populate("cart")
    console.log(cart);
    return res.status(200).json({ success: true ,result:cart});
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
          'isBanned':false


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
    const {selectedSlot,selectedAddress,expertmechanic} = req.body;
    console.log(req.userId)
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.userId},
      {
        $set: {
          bookedSlots: selectedSlot,
          bookedAddress:selectedAddress,
          selectedmechanic:expertmechanic
         
        },
      }
    );
   
    res.status(200).json({ message: "successfully updated ", success: true });
  } catch (err) {
    console.log(err)
    // const errors = handleErrorManagent(err);
    res.json({ message: "something went wrong", status: false, errors });
  }
};
module.exports.payment = async (req, res) => {
  try {
    console.log("kkkkaaa")
    console.log(req.body)
    const user=await UserModel.findById({_id:req.userId})
   
    const instance = new Razorpay({
      key_id,
      key_secret
    })

    const options = {
      amount: user.cartTotal * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString('hex')
    }

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something gone wrong' })
      }
      res.status(200).json({ data: order })
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }  
};
module.exports.verifyRazorPayment = async (req, res) => {
  try {
   console.log(req.body,"body data")
    let { razorpay_order_id, razorpay_payment_id, razorpay_signature, user,selectedslot,amount,vehicleBrand,vehicleModel,serviceType,mechanicid} = req.body;
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.key_secret)
      .update(sign.toString())
      .digest("hex");
    console.log(expectedSign,"kkk");
    console.log(razorpay_signature,"lll");
    if (razorpay_signature === expectedSign) {
      
      console.log(user,"working")
      console.log(serviceType,selectedslot,vehicleBrand,vehicleModel,amount)
      const bookingdata= await BookingModel.create({
        user:user,
        billAmount:amount,
        bookedSlot:selectedslot,
        serviceselected:serviceType,
        vehicleBrand:vehicleBrand,
        vehicleModel:vehicleModel,
        mechanic:mechanicid


      })
      console.log(bookingdata,"nnnnnnnnnnnnnn")
       res.status(200).json({
        success: true,
        message: "booked successfully",
       result: bookingdata,
      });
    } else {
     res
        .status(400)
        .json({ success: false, message: "invalid Signature" });
    }
    
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "invalid Signature" });
  }
}
module.exports.getserviceDetails = async (req, res) => {
  try {
 
   
   
   
    const {email}=req.query
    console.log(email)
    const servicehistory = await BookingModel.find({'user.email':email});
      res.json({ success: true, servicehistory});
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.getMechanic = async (req, res) => {
  try {
    const id=req.params.id
    console.log(id);
    const mechanic = await MechanicModel.find({_id:id});
   
    res.json({ success: true, result: mechanic });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.createReview = async (req, res) => {

  const{newReview,mechanicId}=req.body
  console.log(newReview.name)

  try {
    // Validate the incoming data (you can use a library like "joi" for validation)

    // Create the review
    const review = await ReviewModel.create({

      user:req.userId,
      mechanic:mechanicId,
     message:newReview.comment,
      rating:newReview. rating,
      date:newReview.date
    });
    // Update the averageRating for the mechanic
    const mechanic = await MechanicModel.findById(mechanicId);
    const allReviews = await ReviewModel.find({ mechanic: mechanicId });

    const totalRating = allReviews.reduce((total, review) => total + review.rating, 0);
    const averageRating = totalRating / allReviews.length;

    mechanic.averageRating = averageRating;
    await mechanic.save();
    return res.status(201).json({ success: true, review,mechanic });
  } catch (error) {
    console.error('Error creating review:', error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};
module.exports.getReviews = async (req, res) => {
  try {
    const id=req.params.id
    const reviews = await ReviewModel.find({mechanic:id}).populate('mechanic').populate('user')
    
   
    res.json({ success: true, result: reviews });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};