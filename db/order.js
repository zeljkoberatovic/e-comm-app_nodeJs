const mongoose = require("mongoose");
const orderShema = new mongoose.Schema({

    date: Date,
    items: Array(any),
    status: Number,
   
});

const Order = mongoose.model("orders", orderShema);
module.exports = Order;