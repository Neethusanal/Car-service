const MechanicModel = require("../Models/MechanicModel");
const { sentOtp, verifyOtp } = require("../Middleware/twilio");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BrandModel = require("../Models/BrandModel");
const cloudinary = require("../config/cloudinary");
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
    console.log(mechanicData, "wesrdtfyghjkm");
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
          status: "pending",
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
        _id: mechanicDetails._id,
        phone: mechanicDetails.phone,
        name: mechanicDetails.name,
        email: mechanicDetails.email,
        image: mechanicDetails.image || null,
        isVerified: mechanicDetails.isVerified,
        qualifiation: mechanicDetails.qualification,
        experience: mechanicDetails.experience,
        status: mechanicDetails.status,
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
