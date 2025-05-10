const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// Import handler funkcija
const {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
  deleteProduct,
  getFeaturedProducts,
  getNewProducts
} = require("./../handlers/product-handler");

// Validacija za kreiranje
const createProductValidation = [
  body('name').notEmpty().withMessage('Naziv je obavezan'),
  body('price').isFloat({ gt: 0 }).withMessage('Cena mora biti broj veći od 0'),
  body('categoryId').isMongoId().withMessage('Neispravan ID kategorije')
];

// Validacija za ažuriranje
const updateProductValidation = [
  body('name').optional().notEmpty().withMessage('Naziv ne sme biti prazan'),
  body('price').optional().isFloat({ gt: 0 }).withMessage('Cena mora biti broj veći od 0'),
  body('categoryId').optional().isMongoId().withMessage('Neispravan ID kategorije')
];

// Kreiranje proizvoda
router.post('/', createProductValidation, createProduct);

// Ažuriranje proizvoda
router.put('/:id', updateProductValidation, updateProduct);

// Dohvati sve proizvode
router.get('/', getProducts);

// Dohvati po ID-u
router.get('/:id', getProductById);

// Brisanje po ID-u
router.delete('/:id', deleteProduct);

// Istaknuti proizvodi
router.get('/home/featured-products', getFeaturedProducts);

// Novi proizvodi
router.get('/home/new-products', getNewProducts);

module.exports = router;
