const express=require("express")
const cors= require("cors")
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const http = require('http')
const mongoose=require("mongoose")
const userRoutes=require('./Routes/UserRoutes')
const adminRoutes=require('./Routes/AdminRoutes')
const mechanicRoutes= require('./Routes/Mechanicroutes')
const cookieParser = require("cookie-parser");
const path = require('path');


app.listen(4000,()=>{
    console.log("server/Backend started on port 4000");
});
mongoose.connect("mongodb://127.0.0.1:27017/carservicemanagement",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB connection successful")
}).catch(err=>{
console.log(err.message)
});




app.use(cors({
    origin:['http://localhost:3000'],
    method:['GET','POST','DELETE','PUT'],
    credentials:true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/',userRoutes)
app.use('/admin',adminRoutes)
app.use('/mechanic',mechanicRoutes)

