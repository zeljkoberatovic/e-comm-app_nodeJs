const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); // Za validaciju podataka

// Importovanje handler-a
const { createBrand, updateBrand, getBrands, getBrandById, deleteBrand } = require("./../handlers/brand-handler");

// Validacija za kreiranje brenda
const brandValidation = [
  body('name')
    .notEmpty().withMessage('Ime je obavezno')
    .isLength({ max: 100 }).withMessage('Ime mora biti kraće od 100 karaktera')
];

// Kreiranje novog brenda
router.post("/", brandValidation, createBrand);

// Ažuriranje postojećeg brenda po ID-u
router.put("/:id", brandValidation, updateBrand);

// Dohvati sve brendove
router.get("/", getBrands);

// Dohvati brend po ID-u
router.get("/:id", getBrandById);

// Brisanje brenda po ID-u
router.delete("/:id", deleteBrand);

module.exports = router;
