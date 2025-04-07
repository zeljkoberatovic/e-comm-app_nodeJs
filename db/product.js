const mongoose = require("mongoose");
const productShema = new mongoose.Schema({

    name: String,
    shotDescription: String,
    description: String,
    purchagePrice: Number,
    sellingPrice: Number,
    images: Array(String),
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories'}
   
});

const Product = mongoose.model("products", productShema);
module.exports = Product;