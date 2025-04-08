const express = require('express');
const router = express.Router();


// Importovanje handlera
const { createCategory, updateCategory, getCategories, getCategoryById, deleteCategory } = require("./../handlers/category-handler");

// Kreiranje nove kategorije
router.post("/", createCategory);

// Ažuriranje postojeće kategorije po ID-u
router.put("/:id", updateCategory);

// Dohvati sve kategorije
router.get("/", getCategories);

// Dohvati kategoriju po ID-u
router.get("/:id", getCategoryById);

// Brisanje kategorije po ID-u
router.delete("/:id", deleteCategory);


module.exports = router;
