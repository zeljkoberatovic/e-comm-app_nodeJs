const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
      quantity: Number,
      price: Number
    }
  ],
  status: Number // ili 'status: { type: String, enum: ['pending', 'shipped', 'delivered'] }'
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
