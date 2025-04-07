const mongoose = require("mongoose");
const categoryShema = new mongoose.Schema({

    name: String,
   
});

const Category = mongoose.model("categories", categoryShema);
module.exports = Category;