const UserModel = require("../Models/UserModel");
const BannerModel = require("../Models/BannerModel");
const ServicesModel = require("../Models/ServicesModel");
const BrandModel = require("../Models/BrandModel");
const CarsModel = require("../Models/CarsModel");
const ServicelistModel = require("../Models/ServicelistModel");
const LocationModel = require("../Models/LocationModel");
const MechanicModel = require("../Models/MechanicModel");
const BookingModel = require("../Models/BookingModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const maxAge = 3 * 24 * 60 * 60;
const nodemailer = require("nodemailer");
const { sendEmailOTP } = require("../Middleware/Nodemailer");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const ChatModel = require("../Models/ChatModel");
const ReviewModel = require("../Models/ReviewModel");
const key_id = process.env.KEY_ID;
const key_secret = process.env.KEY_SECRET;

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
  try {
    let { name, email, mobile, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      userData = {
        name,
        email,
        password,
        mobile,
      };
      const otpEmail = Math.floor(1000 + Math.random() * 9000);

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
        email:email,
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
module.exports.resendUserOTP= async(req,res)=>{
  try{

    const {resendemail}=req.body
    console.log(resendemail)
    const otpEmail = Math.floor(1000 + Math.random() * 9000);

    emailOtp = otpEmail;

    sendEmailOTP(resendemail, otpEmail)
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
  }catch(err)
  {
    console.log(err)
    res.json({message:err})
  }
}
module.exports.verifyOtp = async (req, res, next) => {
  try {
    let { otp } = req.body;
console.log(otp,emailOtp,"oiuytrewq")
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
      res.status(200).json({
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
    res.status(400).json({
      success: false,
      message: "Entered OTP from email is incorrect",
      created: false,
    });
  }
};
module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      if (user.isBanned) { // Checking if the mechanic is banned
        const errors = { message: "You are banned. Please contact support." };
        return res.json({ errors, success: false })
      }
      const validpassword = bcrypt.compare(password, user.password);
      if (validpassword) {
        const userId = user._id;
        const token = jwt.sign(
          { userId, role: "user" },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: maxAge,
          }
        );

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
      address: userDetails.address,
      cart: userDetails.cart,
      servicelocation: userDetails?.servicelocation || null,
      brand: userDetails?.brand,
      model: userDetails?.model,
      basicPay: userDetails?.basicPay,
      cartTotal: userDetails?.cartTotal,
      bookedSlots: userDetails?.bookedSlots,
      bookedservices: userDetails?.bookedservices,
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
  
 
  const {selectedServiceId,planId}=req.body
  console.log(selectedServiceId,planId)
   const serviceId = selectedServiceId
   console.log( serviceId,planId,"jjjjj")
  
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
        const brandserved = user.brand;
        const brandData = await BrandModel.findOne({ brandName: brandserved });
        if (!brandData) {
          return res.status(400).json({ message: "Brand does not exist" });
        }

        const basicPay = brandData.basicPay;

        // Calculate the total sum

        const totalSum =plan.price;

        // Get the current cart total or set it to 0 if it doesn't exist
        let cartTotal = 0;
        cartTotal += totalSum;

        // Create an object representing the plan and push it to the cart array
        // const planObject = {

        //   planId:planId
        // };

        const result = await UserModel.findByIdAndUpdate(
          { _id: userId },
          {
            $push: { cart: planId },
            $addToSet: { bookedservices: plan.servicelistName },
            cartTotal: cartTotal + basicPay||0,
            basicPay: basicPay,
          },
          { new: true }
        )
          .populate("cart")
          .select("cart cartTotal basicPay");

        return res.status(200).json({
          message: "Service has been added to the cart successfully",
          success: true,
          result: result,
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// module.exports.addToCart = async (req, res) => {
//   const { selectedServiceId, planId } = req.body;
//   const serviceId = selectedServiceId;
//   const userId = req.userId;

//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     } else {
//       // Update the lastClickedServiceId with the selected serviceId
//       user.lastClickedServiceId = serviceId;
//       await user.save();

//       const service = await ServicesModel.findById(serviceId);
//       if (!service) {
//         return res.status(400).json({ message: 'Service does not exist' });
//       }

//       const plan = await ServicelistModel.findById(planId);
//       if (!plan) {
//         return res.status(400).json({ message: 'Plan does not exist' });
//       } else {
//         const lastClickedServiceId = user.lastClickedServiceId;

//         const brandserved = user.brand;
//         const brandData = await BrandModel.findOne({ brandName: brandserved });
//         if (!brandData) {
//           return res.status(400).json({ message: 'Brand does not exist' });
//         }

//         const basicPay = brandData.basicPay;

//         // Calculate the total sum
//         const totalSum = +plan.price;

//         // Create an object representing the plan and set it as the cart
//         const planObject = {
//           planId: planId,
//           serviceId: lastClickedServiceId === serviceId ? lastClickedServiceId : serviceId,
//         };
//         console.log(planObject, "llllllll")

//         const result = await UserModel.findByIdAndUpdate(
//           { _id: userId },
//           {
//             $push:{cart: planObject.planId},// Only the selected plan is added to the cart
//             $addToSet: { bookedservices: plan.servicelistName },
//             cartTotal: basicPay, // Set cartTotal to basicPay as there's only one plan in the cart
//             basicPay: basicPay,
//           },
//           { new: true }
//         )
//           .populate('cart.planId', 'serviceName') // Populate the cart with the plan names
//           .select('cart cartTotal basicPay');

//         return res.status(200).json({
//           message: 'Service has been added to the cart successfully',
//           success: true,
//           result: result,
//         });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

module.exports.getCartData = async (req, res) => {
  try {
    const data = await UserModel.findById(req.userId)
      .populate("cart")
      .select("cart cartTotal");

    // If the user is not found, return an error response
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    console.log(data);
    res.json({ success: true, result: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// module.exports.deleteCartItem = async (req, res) => {
//   try {
//     const id = req.params.id;

//     // Find the item to get its price
//     let item = await ServicelistModel.findById(id);

//     const user = await UserModel.findOne({ _id: req.userId });

//     // Calculate the new cartTotal
//     const cartTotal = user.cartTotal - (item?.price || 0);

//     // Update the user's cart and cartTotal
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       { _id: req.userId },
//       { $pull: { cart: id }, cartTotal: cartTotal },
//       { new: true } // To get the updated user document
//     );

//     return res.status(200).json({ success: true, result: updatedUser });
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .json({ success: false, message: "An error occurred." });
//   }
// };
module.exports.deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the item to get its price
    let item = await ServicelistModel.findById(id);

    const user = await UserModel.findOne({ _id: req.userId });

    // Calculate the new cartTotal
    const cartTotal = user.cartTotal - (item?.price || 0);

    // Ensure the cartTotal is not negative
    const updatedCartTotal = Math.max(cartTotal, 0);

    // Update the user's cart and cartTotal
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: req.userId },
      { $pull: { cart: id }, cartTotal: updatedCartTotal },
      { new: true } // To get the updated user document
    );

    return res.status(200).json({ success: true, result: updatedUser });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred." });
  }
};


module.exports.EditUserProfile = async (req, res) => {
  try {
    const { address, email } = req.body;
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
    const loc = await LocationModel.find();
    res.json({ success: true, result: loc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.updateLocation = async (req, res) => {
  try {
    const { email, locationName } = req.body;
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

module.exports.updateBookingDetails = async (req, res) => {
  try {
    const { brandName, modelName } = req.body;
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.userId },
      {
        $set: {
          brand: brandName,
          model: modelName,
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
    const user = await UserModel.findById(req.userId, "brand");

    const userBrand = user.brand;

    const mechanics = await MechanicModel.aggregate([
      {
        $lookup: {
          from: "brands", // Collection name of BrandModel
          localField: "brandsserved",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $match: {
          "brand.brandName": userBrand,
          isBanned: false,
        },
      },
    ]);

    res.json({ success: true, result: mechanics });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.bookingDataUpdate = async (req, res) => {
  try {
    const { selectedSlot, selectedAddress, expertmechanic } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      { _id: req.userId },
      {
        $set: {
          bookedSlots: selectedSlot,
          bookedAddress: selectedAddress,
          selectedmechanic: expertmechanic,
        },
      }
    );

    res.status(200).json({ message: "successfully updated ", success: true });
  } catch (err) {
    console.log(err);
    // const errors = handleErrorManagent(err);
    res.json({ message: "something went wrong", status: false, errors });
  }
};
module.exports.payment = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.userId });

    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: user.cartTotal * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something gone wrong" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.verifyRazorPayment = async (req, res) => {
  try {
    let {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user,
      selectedslot,
      amount,
      vehicleBrand,
      vehicleModel,
      serviceType,
      mechanicid,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.key_secret)
      .update(sign.toString())
      .digest("hex");
    console.log(expectedSign, "kkk");
    console.log(razorpay_signature, "lll");
    if (razorpay_signature === expectedSign) {
      const bookingdata = await BookingModel.create({
        user: user,
        billAmount: amount,
        bookedSlot: selectedslot,
        serviceselected: serviceType,
        vehicleBrand: vehicleBrand,
        vehicleModel: vehicleModel,
        mechanic: mechanicid,
      });
      const mechanic = await MechanicModel.updateOne(
        { _id: mechanicid },
        { $pull: { slots: selectedslot } }
      );

      res.status(200).json({
        success: true,
        message: "booked successfully",
        result: bookingdata,
      });
    } else {
      res.status(400).json({ success: false, message: "invalid Signature" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "invalid Signature" });
  }
};
// module.exports.getserviceDetails = async (req, res) => {
//   try {
//     const { email } = req.query;

//     const servicehistory = await BookingModel.find({ "user.email": email });
//     res.json({ success: true, servicehistory });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

module.exports.getserviceDetails = async (req, res) => {
  try {
    console.log(req.query)
    const { email, page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;

    const skip = (pageNumber - 1) * itemsPerPage;

    const servicehistory = await BookingModel.find({ "user.email": email })
      .skip(skip)
      .limit(itemsPerPage)
      .sort({ createdAt: -1 });
console.log(servicehistory)
    res.json({ success: true, servicehistory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.getMechanic = async (req, res) => {
  try {
    const id = req.params.id;
  const mechanic = await MechanicModel.find({ _id: id }).populate('brandsserved')
  

    res.json({ success: true, result: mechanic });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.createReview = async (req, res) => {
  const { newReview, mechanicId } = req.body;

  try {
    // Validate the incoming data (you can use a library like "joi" for validation)

    // Create the review
    const review = await ReviewModel.create({
      user: req.userId,
      mechanic: mechanicId,
      message: newReview.comment,
      rating: newReview.rating,
      date: newReview.date,
    });
    // Update the averageRating for the mechanic
    const mechanic = await MechanicModel.findById(mechanicId);
    const allReviews = await ReviewModel.find({ mechanic: mechanicId });

    const totalRating = allReviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    const averageRating = totalRating / allReviews.length;

    mechanic.averageRating = averageRating;
    await mechanic.save();
    return res.status(201).json({ success: true, review, mechanic });
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};
module.exports.getReviews = async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = await ReviewModel.find({ mechanic: id })
      .populate("mechanic")
      .populate("user");

    res.json({ success: true, result: reviews });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.updateUserAddress = async (req, res) => {
  try {
    // console.log(req.body)
    const { newaddress } = req.body;

    const address = await UserModel.findByIdAndUpdate(
      req.userId,
      { $set: { address: newaddress } },
      { new: true }
    ).select("address");

    res
      .status(200)
      .json({
        message: "successfully updated the address",
        success: true,
        result: address,
      });
  } catch (err) {
    console.log(err);
    const errors = handleErrorManagent(err);
    res.json({ message: "something went wrong", status: false, errors });
  }
};
module.exports.deleteAddress = async (req, res) => {
  try {
    const { addressToDelete } = req.body;
    console.log(addressToDelete);
    const user = await UserModel.findByIdAndUpdate(
      req.userId,
      {
        $pull: {
          address: addressToDelete,
          bookedAddress: addressToDelete,
        },
      },
      { new: true }
    ).select("address bookedAddress");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user, "jjj");
    // Respond with the updated user (optional)
    res.status(200).json({ success: true, result: user });
  } catch (err) {}
};
