const mongoose=require('mongoose')
const BookingSchema=  new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:User
        },  
    mechanicId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:Mechanic
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
    out_for_drop:{
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
    brand:{
        type:mongoose.Schema.Types.ObjectId,
            ref:Brand
    },
    model:{
        type:mongoose.Schema.Types.ObjectId,
            ref:Cars
    },
    amount:{
        type:Number,
    },

    
    

  


})
const BookingModel = mongoose.model("Booking",BookingSchema )
module.exports = BookingModel