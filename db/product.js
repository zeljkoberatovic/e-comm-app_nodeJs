const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  shortDescription: String,
  description: String,
  price: Number,
  discount: Number,
  images: [String],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  isFeatured: Boolean,
  isNewProduct: Boolean
},
{ timestamps: true }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;
