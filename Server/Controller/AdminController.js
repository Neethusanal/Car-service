const AdminModel = require("../Models/AdminModel");
const MechanicModel = require("../Models/MechanicModel");
const UserModel = require("../Models/UserModel");
const BrandModel = require("../Models/BrandModel");
const ServiceModel = require("../Models/ServicesModel");
const CarsModel = require("../Models/CarsModel");
const cloudinary = require("../config/cloudinary");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BannerModel = require("../Models/BannerModel");
const fs = require("fs");
const ServicelistModel = require("../Models/ServicelistModel");
const LocationModel = require("../Models/LocationModel");
const BookingModel = require("../Models/BookingModel");
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
    let admin = await AdminModel.findOne({email});

    if (admin) {
      let validPassword = await bcrypt.compare(password, admin.password);

      if (validPassword) {
        const adminId = admin._id;
        const token = jwt.sign({ adminId,role:"admin" }, process.env.JWT_SECRET_KEY, {
          expiresIn: maxAge
        });
        

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
    res.json({message: error.message, success: false });
    // const errors = { email: "Incorrect admin email or password" };
    // res.json({ errors, success: false });
  }
};

module.exports.isAdminAuth = async (req, res) => {
  try {
    let admin = await AdminModel.findById(req.adminId);

    const admindetails = {
      email: admin.email,
    };
    res.json({
      auth: true,
      result: admindetails,
      status: "success",
      message: "signin success",
    });
  } catch (error) {
    res.status(400).json({ auth: false, message: error.message });
  }
};


module.exports.getAllMechanicDetails = async (req, res, next) => {
  try {
   
    // Parse the query parameters for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10

    // Calculate the skip value to skip records based on the current page and limit
    const skip = (page - 1) * limit;

    // Fetch mechanic details with pagination using the skip and limit values
    const mechanic = await MechanicModel.find().skip(skip).limit(limit);

    // Send the paginated response back to the client
    res.json({ status: "success", result: mechanic });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.mechanicApproval = async (req, res) => {
  try {
  
    const id = req.params.id;

    const mechanic = await MechanicModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          isVerified: true,
          status: "Approved",
        },
      }
    );

    res
      .status(200)
      .json({
        message: "Approved Successfully",
        success: true,
        result: mechanic,
      });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.mechanicReject = async (req, res) => {
  try {

    const id = req.params.id;

    const mechanic = await MechanicModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          isVerified: false,
          status: "Rejected",
        },
      }
    );

    res
      .status(200)
      .json({
        message: "Rejected ,Minimum 3 year exoerience needed",
        success: true,
        result: mechanic,
      });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
module.exports.mechanicBlock = async (req, res) => {
  try {
 
    const id = req.params.id;


    const mechanic = await MechanicModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          isBanned: true,
        },
      }
    );

    res
      .status(200)
      .json({
        message: "Mechanic has been Blocked",
        success: true,
        result: mechanic,
      });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

module.exports.getAllUserDetails = async (req, res, next) => {
  try {
   
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

  
    const users = await UserModel.find({ isBanned: false })
      .select("-password")
      .skip(skip)
      .limit(limit);

    res.json({ status: "success", result: users });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.addNewBrands = async (req, res, next) => {
  try {
   
    const { brand, description, basicPay } = req.body;
   ;
    const result = await cloudinary.uploader.upload(req.file.path, {
      format: "WebP",
    });
   
    const brands = await BrandModel.create({
      brandName: brand,
      description: description,
      basicPay: basicPay,
      image: result.secure_url,
    });

    res
      .status(200)
      .json({ message: "successfully add new Brand", success: true });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
    
  }
};

module.exports.getAllBrands = async (req, res, next) => {
  try {
  
    const brands = await BrandModel.find({ isActive: true });
  
    res.json({ success: true, result: brands });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.deleteBrand = async (req, res, next) => {
  try {
  
    const brand = req.params.id;
    BrandModel.findByIdAndUpdate(
      { _id: brand },
      { $set: { isActive: false } }
    ).then((response) => {
      res.status(200).json({ message: "Deleted Successful", success: true });
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.blockUser = async (req, res, next) => {
  let id = req.params.id;

  await UserModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        isBanned: true,
      },
    }
  ).then((response) => {
    res.status(200).json({ message: "Banned Successfully", success: true });
  });
};
module.exports.unblockUser = async (req, res) => {
  let id = req.params.id;

  await UserModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        isBanned: false,
      },
    }
  ).then((response) => {
    res.status(200).json({ message: "Banned Successfully", success: true });
  });
};
module.exports.updateBrand = async (req, res, next) => {
  try {
   
    const { id, brandName, description, basicPay } = req.body;

    const image = await cloudinary.uploader.upload(req.file.path, {
      format: "WebP",
    });
    const brands = await BrandModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          brandName: brandName,
          description: description,
          basicPay: basicPay,
          image: image.secure_url,
        },
      }
    );

  
    res
      .status(200)
      .json({ message: "successfully updated the Brand", success: true });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.addNewServices = async (req, res, next) => {
  try {
    const { serviceName, price, description } = req.body;
  
    const result = await cloudinary.uploader.upload(req.file.path, {
      format: "WebP",
    });


    const services = await ServiceModel.create({
      serviceName: serviceName,
      description: description,
      image: result.secure_url,
    });
  
    res
      .status(200)
      .json({ message: "successfully add new service", success: true });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

module.exports.getAllServices = async (req, res, next) => {
  try {
    
    
    const pageNumber = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.limit) || 10;
    const skip = (pageNumber - 1) * itemsPerPage;
    
    const services = await ServiceModel.find({ status: true })
      .skip(skip)
      .limit(itemsPerPage)
      .exec();
    
   ;
    
    res.json({ success: true, result: services });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.updateService = async (req, res, next) => {
  try {
   
    const { id, serviceName, description } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path, {
      format: "WebP",
    });
    const services = await ServiceModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          serviceName: serviceName,
          description: description,
          image: image.secure_url,
        },
      }
    );

 
    res
      .status(200)
      .json({ message: "successfully updated the Brand", success: true });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.deleteService = async (req, res, next) => {
  try {
  
    const serviceid = req.params.id;
    ServiceModel.findByIdAndUpdate(
      { _id: serviceid },
      { $set: { status: false } }
    ).then((response) => {
      res.status(200).json({ message: "Deleted Successful", success: true });
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
module.exports.getAllBrandNames = async (req, res, next) => {
  const brands = await BrandModel.find({ isActive: true });
  res.status(200).json({
    message: "successfully get all brandnames",
    result: brands,
    success: true,
  });
};
module.exports.addcarModels = async (req, res, next) => {
  try {
    const { carName, brandName, fuelType } = req.body;

    const cars = await CarsModel.create({
      carName: carName,
      brandName: brandName,
      fuelType: fuelType,
    });

    res.status(200).json({ message: "successfully add cars", success: true });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
module.exports.getAllcarDetails = async (req, res, next) => {
  try {
    const cars = await CarsModel.find({ status: true }).populate("brandName");

    res.json({ success: true, result: cars });
  } catch (error) {
    
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.deleteCar = async (req, res, next) => {
  try {
    const carid = req.params.id;
    CarsModel.findByIdAndUpdate(
      { _id: carid },
      { $set: { status: false } }
    ).then((response) => {
      res.status(200).json({ message: "Deleted Successful", success: true });
    });
  } catch (error) {
  
    res.json({ message: error.message, status: false });
  }
};
module.exports.updateCar = async (req, res, next) => {
  try {
    const { carName, brandName, fuelType } = req.body;

    const cars = await CarsModel.updateOne({
      carName: carName,
      brandName: brandName,
      fuelType: fuelType,
    });

    res
      .status(200)
      .json({ message: "successfully updated the cars", success: true });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.addBanner = async (req, res, next) => {
  try {
    const { bannerName, description } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      format: "WebP",
    });
    console.log(result.secure_url);
    const banner = await BannerModel.create({
      bannerName: bannerName,
      description: description,
      image: result.secure_url,
    });

    res
      .status(200)
      .json({ message: "successfully add new service", success: true });
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.getBanners = async (req, res, next) => {
  try {
    const banners = await BannerModel.find({});

    res.json({ success: true, result: banners });
  } catch (error) {
   
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.updateBanner = async (req, res, next) => {
  try {
    const { id, bannerName, description } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path, {
      format: "WebP",
    });

    const banner = await BannerModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          bannerName: bannerName,
          description: description,
          image: image.secure_url,
        },
      }
    );

    res
      .status(200)
      .json({ message: "successfully updated the banner", success: true });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
module.exports.blockBanner = async (req, res, next) => {
  try {
    const id = req.params.id;

    const banner = await BannerModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: false,
        },
      }
    );

    res.status(200).json({ message: "blocked Successfully", success: true });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
module.exports.unblockBanner = async (req, res, next) => {
  try {
    const id = req.params.id;

    const banner = await BannerModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: true,
        },
      }
    );

    res.status(200).json({ message: "unblocked Successfully", success: true });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

module.exports.getServiceName = async (req, res, next) => {
  try {
    const services = await ServiceModel.find({ status: true });

    res.json({ success: true, result: services });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.addServicesList = async (req, res, next) => {
  try {
    const { serviceName, descriptionLines, name, price } = req.body;

    const servicelist = await ServicelistModel.create({
      serviceName: serviceName,
      servicelistName: name,
      description: descriptionLines,
      price: price,
    });

    res
      .status(200)
      .json({ message: "successfully added the list", success: true });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
// module.exports.getAllServiceList = async (req, res, next) => {
//   try {
//     const serviceslist = await ServicelistModel.find().populate("serviceName");

//     res.json({ success: true, result: serviceslist });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
module.exports.getAllServiceList = async (req, res, next) => {
  try {
  
    const pageNumber = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.limit) || 10;
    const skip = (pageNumber - 1) * itemsPerPage;
    
    const serviceslist = await ServicelistModel.find()
      .populate("serviceName")
      .skip(skip)
      .limit(itemsPerPage)
      .exec();
    
    res.json({ success: true, result: serviceslist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.updateServiceList = async (req, res, next) => {
  try {
    const { serviceName, name, price, descriptionLines } = req.body;

    const list = await ServicelistModel.updateOne({
      serviceName: serviceName,
      serviceListName: name,
      price: price,
      description: descriptionLines,
    });

    res
      .status(200)
      .json({ message: "successfully updated the list", success: true });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
module.exports .addPlaces = async (req, res) => {
  try {
    const {locationname } = req.body;
    const loc = await LocationModel.create({
      Locationname: locationname,
    });
    res.status(200).json({ message: "successfully added", success: true });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
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
module.exports.deleteLocation = async (req, res) => {
  try {
    const id = req.params.id;
  let loc=await LocationModel.findByIdAndDelete({_id:id})
      res.status(200).json({ message: "Deleted Successful", success: true });

  } catch (error) {
  
    res.status(400).json({ status: "error", message: error.message });
  }
};
module.exports.getBookingData = async (req, res) => {
  try {
    const bookingdata = await BookingModel.find({});
 
      res.json({ success: true, result:bookingdata});
  } catch (error) {
 
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.getSalesDetails = async (req, res) => {
  const { from, to } = req.query;
 

  try {
    // Parse the date strings into Date objects
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const salesDetails = await BookingModel.aggregate([
      {
        $match: {
          "service_status.dropped.state": true,
          "service_status.dropped.date": {
            $gte: fromDate, // Use the parsed Date objects in the query
            $lte: toDate,
          },
        },
      },
 
      // {
      //   $group: {
      //     _id: null,
      //     totalSales: { $sum: "$billAmount" },
      //   },
      // },
    ]);

 

   
      return res.json({success:true,result:salesDetails});
   
    
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};