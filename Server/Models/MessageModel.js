const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    
      chatId: { type: String },
      SenderId:{type:String},
      text:{type:String},
    
    },
   
  
    {
      timestamps: true,
    }
 
);


const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
