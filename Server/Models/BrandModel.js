const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
 brandName: {
    type: String,
    required: true,
    validate: {
      validator: async function (value) {
        const count = await this.model("Brands").countDocuments({
          brandName: { $regex: new RegExp(`^${value}$`, "i") },
        });
        return count === 0;
      },
      // message: "Brand name already exists.",
    },
    unique:true
  },
  description:{
    type:String,
    
},
basicPay:{
    type:Number,
    
},

isActive:
{
    type:Boolean,
    default:true
},
image:{
  type: String,
  required: true
},
created:{
  type:Date,
  required:true,
  default:Date.now
}
});



const BrandModel = mongoose.model("Brands",BrandSchema )
module.exports = BrandModel