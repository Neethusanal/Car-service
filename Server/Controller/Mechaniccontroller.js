const MechanicModel = require("../Models/MechanicModel");
const { sentOtp, verifyOtp } = require("../Middleware/twilio");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BrandModel = require("../Models/BrandModel");
const cloudinary = require("../config/cloudinary");
const UserModel = require("../Models/UserModel");
const BookingModel = require("../Models/BookingModel");
const maxAge = 3 * 24 * 60 * 60;

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

let mechanicData;
//Mechanic Register using OTP
module.exports.mechanicregister = async (req, res, next) => {
  try {
    let { name, email, phone, password } = req.body;
    console.log("mechanic entered");
    mechanicData = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
    console.log(mechanicData, "hiiiiii");
    const mechanic = await MechanicModel.findOne({ email });
    const phoneno = await MechanicModel.findOne({ phone });
    if (mechanic || phoneno) {
      res
        .status(401)
        .json({ status: "failed", message: "Data already exists Login now" });
    } else {
      console.log("hii sent otp");
      let data = await sentOtp(phone);
      console.log(data);

      res
        .status(201)
        .json({ status: "success", message: "otp sending successful" });
    }
  } catch (error) {
    res.status(401).json({ status: "failed", message: error.message });
  }
  console.log("end");
};
module.exports.verifyOtp = async (req, res, next) => {
  try {
    console.log("verify otp entered");

    const { otp } = req.body;
    console.log(otp);
    let { name, email, phone, password } = mechanicData;
   
    let mechDetails = await verifyOtp(otp, phone);

    if (mechDetails.status === "approved") {
      let hashpassword = await bcrypt.hash(password, 10);
      let mechanicdetails = await MechanicModel.create({
        name,
        email,
        phone,
        password: hashpassword,
      });
      console.log(mechanicdetails, "created");
      res.status(200).json({
        success: true,
        mechanicdetails,
        message: "succesfully created new Mechanic",
      });
    } else {
      res.json({ success: false, message: "incorrect OTP" });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports.updateDetails = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    const { email, experience, qualification, brand } = req.body;

    const doc = await cloudinary.uploader.upload(
      req.files.certificate[0].path,
      {
        format: "WebP",
      }
    );
    const mechanic = await MechanicModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          experience: experience,
          brandserved: brand,
          certificate: doc.secure_url,
          qualification: qualification,
          status:"pending",
        },
      }
    );
    res.json({ success: true, message: "Details Updated" });
  } catch (err) {
    console.log(err);
  }
};
module.exports.mechanicLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const mechanic = await MechanicModel.findOne({ email });
    console.log("mechanic", mechanic);
    if (mechanic) {
      const validpassword = bcrypt.compare(password, mechanic.password);
      if (validpassword) {
        const mechanicId = mechanic._id;
        const token = jwt.sign({ mechanicId }, process.env.JWT_SECRET_KEY, {
          expiresIn: 30000,
        });
        console.log(token, "token");
        res.status(200).json({
          message: "Login Successfull",
          mechanic,
          token,
          success: true,
          mechanicData: mechanic,
        });
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
module.exports.isMechanicAuth = async (req, res) => {
  try {
    let mechanicDetails = await MechanicModel.findById(req.mechanicId);
    mechanicDetails.auth = true;
    if (mechanicDetails) {
      res.json({
        auth: true,
        id: mechanicDetails.id,
        phone: mechanicDetails.phone,
        name: mechanicDetails.name,
        email: mechanicDetails.email,
        image: mechanicDetails.image || null,
        isVerified: mechanicDetails.isVerified,
        qualifiation: mechanicDetails.qualification,
        experience: mechanicDetails.experience,
        status: mechanicDetails.status,
        slots:mechanicDetails.slots,
      });
    }
  } catch (error) {
    res.json({ auth: false, message: error.message });
  }
};

module.exports.getAllBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find({});
    res.json({ success: true, result: brands });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.updateProfile = async (req, res) => {
  try {
    console.log(req.files, "datas in file");
    const id = req.mechanicId;

    const { fullName, email, phone, brand, experience, address } = req.body;
    const image = await cloudinary.uploader.upload(
      req.files.profileImage[0].path,
      {
        format: "WebP",
      }
    );

    const mechanic = await MechanicModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: fullName,
          email: email,
          phone: phone,
          brandsserved: brand,
          experience: experience,
          image: image.secure_url,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: " profile successfully updated ",
      result: mechanic,
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrorManagent(err);
    res.json({ message: "something went wrong", status: false, errors });
  }
};
//Adding Slots to MechanicDetails
module.exports.addmechanicSlots = async (req, res) => {
  try {
    const { slotsselected } = req.body;
    const id = req.mechanicId;
    const mechanic = await MechanicModel.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { slots: { $each: slotsselected } } }
    );
    console.log(mechanic, "updated slot");
    res.status(200).json({ message: "successfully added", success: true });
  } catch (err) {
    const errors = handleErrorManagent(err);
    res.json({ message: "Already existing Data", status: false, errors });
  }
};
module.exports.getUser = async (req, res) => {
  try {
    console.log(req.params.id,"id")
    const id=req.params.id
    console.log(id);
    const user = await UserModel.find({_id:id});
   console.log(user,"userrrrrr")
    res.json({ success: true, result: user});
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
}
module.exports.getBookingDetails = async (req, res) => {
  try {
   
    
    const bookingdetails = await BookingModel.find({mechanic:req.mechanicId});
   console.log(bookingdetails,"booking details")
    res.json({ success: true, result:bookingdetails});
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
}

// module.exports.updateBookingStatus = async (req, res) => {
//   try {
//     const {id,newStatus}=req.body
//     console.log(id,newStatus,"valueee")
//     const booking = await BookingModel.findById({_id:id});

//     if (!booking) {
//       res.json({ success: false, message:"No Booking details found"});
//       return;
//     }

//     // Update the service_status based on the newStatus
//     switch (newStatus) {
//       case 'Pickup':
//         booking.service_status.pickup.state = true;
//         booking.service_status.pickup.date = new Date();
//         break;
//       case 'On Service':
//         booking.service_status.onService.state = true;
//         booking.service_status.onService.date = new Date();
//         break;
//       case 'Completed':
//         case 'Completed':
//           booking.service_status.servicecompleted.state = true;
//           booking.service_status.servicecompleted.date = new Date();
//           break;
        
//       case 'Delivered':
//         booking.service_status.dropped.state = true;
//         booking.service_status.dropped.date = new Date();
//         break;
//       default:
//         // Handle if the newStatus is not valid
//         return;
//     }

//     await booking.save();

//     res.json({ success: true, result:booking});
   
    
//   } catch (err) {
//     const errors = handleErrorManagent(err);
//     res.json({ message: "something went wrong", status: false, errors });
//   }
// };

module.exports.updateBookingStatus = async (req, res) => {
  try {
    const { id, newStatus } = req.body;
    console.log(id, newStatus, "valueee");
    const booking = await BookingModel.findById({ _id: id });

    if (!booking) {
      res.json({ success: false, message: "No Booking details found" });
      return;
    }

    // Update the service_status based on the newStatus
    switch (newStatus) {
      case 'Pickup':
        booking.service_status.pickup.state = true;
        booking.service_status.pickup.date = new Date();
        break;
      case 'On Service':
        booking.service_status.onService.state = true;
        booking.service_status.onService.date = new Date();
        break;
      case 'Completed':
        booking.service_status.servicecompleted.state = true;
        booking.service_status.servicecompleted.date = new Date();
        break;
      case 'Delivered':
        booking.service_status.dropped.state = true;
        booking.service_status.dropped.date = new Date();
        break;
      default:
        // Handle if the newStatus is not valid
        return;
    }

    await booking.save();

    const status =
  booking?.service_status?.dropped?.state
    ? 'Delivered'
    : booking?.service_status?.servicecompleted?.state
    ? 'Completed'
    : booking?.service_status?.onService?.state
    ? 'On Service'
    : booking?.service_status?.pickup?.state
    ? ' For Pickup'
    : '';
    console.log(status)
    res.json({ success: true, result: booking, status });
  } catch (err) {
    console.log(err)
    const errors = handleErrorManagent(err);
    res.json({ message: 'something went wrong', status: false, errors });
  }
};

