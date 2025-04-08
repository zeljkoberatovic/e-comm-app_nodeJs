const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); // Za validaciju podataka

// Importovanje handler-a
const { createCategory, updateCategory, getCategories, getCategoryById, deleteCategory } = require("./../handlers/category-handler");

// Validacija za kreiranje kategorije
const categoryValidation = [
  body('name').notEmpty().withMessage('Ime je obavezno').isLength({ max: 100 }).withMessage("Ime mora biti kraće od 100 karaktera")
];

// Kreiranje nove kategorije
router.post("/", categoryValidation, createCategory);

// Ažuriranje postojeće kategorije po ID-u
router.put("/:id", categoryValidation, updateCategory);

// Dohvati sve kategorije
router.get("/", getCategories);

// Dohvati kategoriju po ID-u
router.get("/:id", getCategoryById);

// Brisanje kategorije po ID-u
router.delete("/:id", deleteCategory);

module.exports = router;
