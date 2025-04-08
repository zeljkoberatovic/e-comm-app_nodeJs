const Category = require("./../db/category");
const { validationResult } = require('express-validator'); // Za validaciju podataka

// Kreiranje nove kategorije
const createCategory = async (req, res, next) => {
  // Validacija podataka
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const categoryData = req.body;

    const newCategory = new Category({
      name: categoryData.name
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (err) {
    next(err);  // Prosleđivanje greške na globalni error handler
  }
};

// Ažuriranje postojeće kategorije po ID-u
const updateCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  const newValues = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name: newValues.name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Kategorija nije pronađena." });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err); // Prosleđivanje greške na globalni error handler
  }
};

// Dohvati sve kategorije
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err); // Prosleđivanje greške na globalni error handler
  }
};

// Dohvati kategoriju po ID-u
const getCategoryById = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    
    if (!category) {
      return res.status(404).json({ message: "Kategorija nije pronađena." });
    }

    res.status(200).json(category);
  } catch (err) {
    next(err); // Prosleđivanje greške na globalni error handler
  }
};

// Brisanje kategorije po ID-u
const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Kategorija nije pronađena." });
    }

    res.status(200).json({ message: "Kategorija nije pronađena." });
  } catch (err) {
    next(err); // Prosleđivanje greške na globalni error handler
  }
};

module.exports = { createCategory, updateCategory, getCategories, getCategoryById, deleteCategory };
