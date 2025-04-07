const mongoose = require("mongoose");
const userShema = new mongoose.Schema({

    name: String,
    email: String,
    password: String,
    isAdmin: Boolean

});

const User = mongoose.model("users", userShema);
module.exports = User;