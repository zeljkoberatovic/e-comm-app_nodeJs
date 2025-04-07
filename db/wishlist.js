const mongoose = require("mongoose");
const wishlistShema = new mongoose.Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'users'},
    productId: Array(String)
   
});

const Wishlist = mongoose.model("wishlists", wishlistShema);
module.exports = Wishlist;