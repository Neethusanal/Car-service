const mongoose = require("mongoose");

const servicelistSchema = new mongoose.Schema({

    serviceName:{
        type:mongoose.Types.ObjectId,
        required: true,
        ref: "Services",
    },
   
    servicelistName:{
        type:String
    },
      description:
      {
        type:Array,
        required :true
      },
      price:{
        type:Number,
      },
      
      status:{
        type:Boolean,
        default:true
      }
      





});



const ServicelistModel = mongoose.model("Serviceslist",servicelistSchema )
module.exports = ServicelistModel