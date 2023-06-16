const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  bannerName: {
    type: String,
    required: true,
    unique: true, // Add unique index to bannerName field
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const BannerModel = mongoose.model('Banner', bannerSchema);

module.exports = BannerModel;
