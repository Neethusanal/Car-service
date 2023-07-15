
const ChatModel = require("../Models/ChatModel");
module.exports.createChat=async(req,res)=>{
try{
  const chat=await ChatModel.findOne({members:[req.body.senderId,req.body.recieverId]})
  if(chat)
  {
    res.status(200).json({success:true})
  }
  else
  { const newchat=new ChatModel({
    members:[req.body.senderId,req.body.recieverId]
  })
  const result=await newchat.save()
      res.status(200).json(result)
    
  }
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
      console.log(chat)
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
   
   