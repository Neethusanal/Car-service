const mongoose=require('mongoose')
const mechanicSchema=  new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name is required"],
    },
    
    email:{
        type:String,
        required:[true,"Email is required"],
        unique : true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        
    },
    image: {
        type: String,
      },
    phone:{
        type:Number,
        required:[true,"phone no is required"],
        unique : true
    },
    experience:{
        type:Number,
      
    },
    qualification:{
        type:String
    },
    brandsserved:{
        type:mongoose.Types.ObjectId,
        ref: "Brands",
    },
    slots:{
        type:Array
    },
    bookedslots:{
        type:Array
    },
    isVerified:
    {
        type:Boolean,
        default:false
    },
    rating:{
        type:Array
    },
    isBanned:{
        type:Boolean,
        default:false
    },
    status:{
        type:String
    },
    certificate:{
        type:String
    },
    servinglocation:{
        type:String
    }
   


})
const MechanicModel = mongoose.model("Mechanic",mechanicSchema )
module.exports = MechanicModel