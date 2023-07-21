const mongoose=require("mongoose")
 const ReviewSchema= new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    mechanic:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Mechanic",
    },
  
    message: { type: String, required: true },
    rating: { type:Number, required: true },
 },
 {
    timestamps: true,
  }


 )

 const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports = ReviewModel;
