const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// Importovanje handler funkcija
const { createProduct, updateProduct, getProducts, getProductById, deleteProduct } = require("./../handlers/product-handler");

// Validacija za kreiranje
const createProductValidation = [
  body('name').notEmpty().withMessage('Naziv je obavezan'),
  body('price').isFloat({ gt: 0 }).withMessage('Cena mora biti broj veći od 0'),
  body('categoryId').isMongoId().withMessage('Neispravan ID kategorije')
];

// Validacija za ažuriranje (sva polja opciona)
const updateProductValidation = [
  body('name').optional().notEmpty().withMessage('Naziv ne sme biti prazan'),
  body('price').optional().isFloat({ gt: 0 }).withMessage('Cena mora biti broj veći od 0'),
  body('categoryId').optional().isMongoId().withMessage('Neispravan ID kategorije')
];

// Kreiranje proizvoda
router.post('/', createProductValidation, createProduct);

// Ažuriranje proizvoda
router.put('/:id', updateProductValidation, updateProduct);

// Dohvati sve
router.get('/', getProducts);

// Dohvati po ID-u
router.get('/:id', getProductById);

// Brisanje
router.delete('/:id', deleteProduct);

module.exports = router;
