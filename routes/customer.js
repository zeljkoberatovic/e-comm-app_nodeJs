const express = require('express');
const router = express.Router();
const Product = require('../db/product'); 

// Ruta za nove proizvode
router.get("/home/new-products", async (req, res) => {
  try {
    const newProducts = await Product.find({ isNewProduct: true }); 
    res.json(newProducts);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvatanju novih proizvoda.' });
  }
});

// Ruta za istaknute proizvode
router.get("/home/featured-products", async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.json(featuredProducts);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvatanju istaknutih proizvoda.' });
  }
});

module.exports = router; 
