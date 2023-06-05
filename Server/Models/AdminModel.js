const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true
},
  password:{
    type:String,
    required:true
},
created:{
  type:Date,
  required:true,
  default:Date.now
}
});

 

const AdminModel = mongoose.model("Admin",AdminSchema )
module.exports = AdminModel