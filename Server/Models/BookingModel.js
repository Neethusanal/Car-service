const mongoose=require('mongoose')
const BookingSchema=  new mongoose.Schema({

   user:{
        type:Object,
   },
   mechanic:{
    type:mongoose.Types.ObjectId,
        required: true,
        ref: "Mechanic",
   },

    billAmount:{
        type:Number
    },
    service_status:
    {pickup:{
        state:{type:Boolean, default:false},
        date:{type:Date},
    },
    onService:{
        state:{type:Boolean, default:false},
        date:{type:Date},
    }, 
    servicecompleted:{
        state:{type:Boolean, default:false},
        date:{type:Date},
    },
    dropped:{
        state:{type:Boolean, default:false},
        date:{type:Date},
    },
    },
    bookedSlot: {
        type:String,
    },
    serviceselected:[{
        type:String
    }],
    vehicleBrand:{
        type:String
    },
    vehicleModel:
    {
        type:String
    },

   
    
    
    

  


})
const BookingModel = mongoose.model("Booking",BookingSchema )
module.exports = BookingModel