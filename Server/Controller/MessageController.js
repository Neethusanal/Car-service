const MessageModel = require("../Models/MessageModel");
module.exports.addMessage=async(req,res)=>{
const {chatId,senderId,text}=req.body
const message=new MessageModel({chatId,senderId,text})
try{
const result=await message.save()
res.status(200).json(result)
}catch(error)
{
    res.status(500).json(error)
}
}

module.exports.getMessages=async(req,res)=>{
    console.log("data")
    const {chatId}=req.params;
    console.log(chatId)
    try{
        const result=await MessageModel.find({chatId})
        res.status(200).json(result)
    }catch(error)
    {
        res.status(500).json(error)
    }
}