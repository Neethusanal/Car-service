
const ChatModel = require("../Models/ChatModel");
module.exports.createChat=async(req,res)=>{
    console.log(req.body)
    const{from ,to, message}=req.body
    const newchat=new ChatModel({
      members:[req.body.senderId,req.body.recieverId]
    })
    try{
      const result=await newchat.save()
      res.status(200).json(result)
  }catch(err)
  {
    res.status(500).json(err)
  }
  }
  module.exports.userChat=async(req,res)=>{
  
    try{
      const chat=await ChatModel.find({
        members:{$in:[req.params.userid]}
      })
      res.status(200).json(chat)
  
    }catch(err)
  {
    res.status(500).json(err)
  }
  }
  module.exports.findChat=async(req,res)=>{
  try{
    const chat=await ChatModel.findOne({
      members:{$all:[req.params.firstId,req.params.secondId]}
    })
    res.status(200).json(chat)
  }catch(err)
  {
    res.status(500).json(err)
  }
  }
   
   