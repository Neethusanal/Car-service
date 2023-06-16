const mongoose = require("mongoose");

const CarsSchema = new mongoose.Schema({

    carName:{
        type:String,
        required:[true,"Name is required"],
        

    },
    brandName: {
   
        type:mongoose.Types.ObjectId,
        required: true,
        ref: "Brands",
      },
      
      fuelType:{
        type:String
      },
      status:{
        type:Boolean,
        default:true
      }

      





});



const CarsModel = mongoose.model("Cars",CarsSchema )
module.exports = CarsModel