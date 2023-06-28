const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  Locationname: {
    type: String,
    unique: true,
  },
 
 
});

const LocationModel = mongoose.model("Location", LocationSchema);
module.exports = LocationModel;
