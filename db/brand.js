const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
},
{ timestamps: true }
);

const Brand = mongoose.model("brands", brandSchema);

module.exports = Brand;
