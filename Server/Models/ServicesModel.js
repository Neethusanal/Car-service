const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({

    serviceName:{
        type:String,
        required:[true,"Name is required"],

    },
   
      description:
      {
        type:String,
        required :true
      },
      image:{
        type: String,
        required: true
      },
      status:{
        type:Boolean,
        default:true
      }
      





});



const ServiceModel = mongoose.model("Services",serviceSchema )
module.exports = ServiceModel