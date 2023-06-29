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
    
    kilometers:{
        type:Number
      },
    mobile:{
        type:String,
        required:[true,"phone no is required"],
        unique : true
    },
    
    model:{
        type:String,
      
    },
    address:{
        type:String
    },
    brand:{
        type:String,
    },
    slots:{
        type:Array
    },
    vehiclenumber:{
        type:String,
    },
    isVerified:
    {
        type:Boolean,
        default:false
    },
    
    isBanned:{
        type:Boolean,
        default:false
    },services:{
        type:Array
    },
    packages:{
        type:Array
    },created:{
        type:Date,
        required:true,
        default:Date.now
      },
      servicelocation:{
        type:String
      }


})
const UserModel = mongoose.model("User",userSchema )
module.exports = UserModel