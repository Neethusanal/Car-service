const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    
      members: { type: Array },
    
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "senderModel",
      },
      senderModel: {
        type: String,
        required: true,
        enum: ["user", "mechanic"],
      },
    
      text:{
        type:String
      },
    },
   
  
    {
      timestamps: true,
    }
 
);


const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
