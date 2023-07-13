const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
const http = require('http');
const mongoose = require("mongoose");
const userRoutes = require('./Routes/UserRoutes');
const adminRoutes = require('./Routes/AdminRoutes');
const mechanicRoutes = require('./Routes/Mechanicroutes');
const path = require('path');
const server = require('http').createServer(app);
const socket = require('socket.io')


dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB connection successful");
}).catch(err => {
  console.log(err.message);
});
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  method: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(express.static(path.join(__dirname, "public")));
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/mechanic', mechanicRoutes);




server.listen(4000, () => {
  console.log("Server/Backend started on port 4000");
});
const io=socket(server,{
  cors:{origin:"http://localhost:3000",
  credentials:true
}
})
global.onlineUsers=new Map(),
io.on("connection",(socket)=>{
  console.log("connected socketio")
  global.chatSocket=socket;
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id)
  })

socket.on("send-msg",(data)=>{
  const sendUserSocket=onlineUsers.get(data.to)
  if(sendUserSocket){
    socket.to(sendUserSocket).emit("msg-recieve",data.msg)
  }
  
})
})