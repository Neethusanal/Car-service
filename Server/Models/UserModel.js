const mongoose=require('mongoose')
const userSchema=  new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name is required"],
    },
    
    email:{
        type:String,
        required:[true,"Email is required"],
        unique : true
    },
    
    cart:[{
        type:mongoose.Schema.Types.ObjectId, ref:'Serviceslist'
    }],
    password:{
        type:String,
        required:[true,"password is required"],
        
    },
    
 
    mobile:{
        type:String,
        required:[true,"phone no is required"],
        unique : true
    },
    
    model:{
        type:String,
      
    },
    address:[{
        type:String
    }],
    brand:{
        type:String,
    },
    bookedSlots:{
        type:String
    },
    bookedAddress:[{
        type:String
    }],
    bookedservices:[{
        type:String
    }],
    isVerified:
    {
        type:Boolean,
        default:false
    },
    
    isBanned:{
        type:Boolean,
        default:false
    },

      servicelocation:{
        type:String
      },
      cartTotal:{
        type:Number,
        default:0
      },
      basicPay:{
        type:Number,
      },
      selectedmechanic:{
        type:String
      },


})
const UserModel = mongoose.model("User",userSchema )
module.exports = UserModel