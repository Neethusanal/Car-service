const express = require("express");
const cors = require("cors");
const app = express();
const port=process.env.PORT||4000
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

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log("DB connection successful");
// }).catch(err => {
//   console.log(err.message);
// });


mongoose.connect(process.env.DATABASE_URL, {
  // You no longer need to pass useNewUrlParser or useUnifiedTopology
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));
app.use(express.json());
app.use(cors({
  origin: [process.env.BASE_URL],
  method: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(express.static(path.join(__dirname, "public")));
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/mechanic', mechanicRoutes);




server.listen(port, () => {
  console.log("Server/Backend started on port ${port}");
});
const io=socket(server,{
  cors:{origin:process.env.BASE_URL,
 credentials:true
}
})

let activeUsers=[]


io.on("connection",(socket)=>{
console.log("connected socketio")
//Add new User
socket.on("new-user-add",(newUserId)=>{
//if user is not added previously
if(!activeUsers.some((user)=>user.userId===newUserId))
{
   activeUsers.push({
       userId:newUserId,
       socketId:socket.id
   })
}
console.log("connected", activeUsers)
io.emit('New User Connected',activeUsers)
})
// send Message
socket.on("send-message",(data)=>{
  const {recieverId}=data;
  const user=activeUsers.find((user)=>user.userId===recieverId)
  console.log("Data",data)
  if(user)
  io.to(user.socketId).emit("recieve-message",data)
})

socket.on("disconnect",()=>{
activeUsers=activeUsers.filter((user)=>user.socketId!==socket.id)
console.log("User disconnected",activeUsers)
io.emit('get-users',activeUsers)

})
})