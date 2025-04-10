const Brand = require("./../db/brand");
const { validationResult } = require('express-validator');

// Kreiranje novog brenda
const createBrand = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const brandData = req.body;

    const newBrand = new Brand({
      name: brandData.name
    });

    const savedBrand = await newBrand.save();

    res.status(201).json(savedBrand);
  } catch (err) {
    next(err);
  }
};

// Ažuriranje postojećeg brenda po ID-u
const updateBrand = async (req, res, next) => {
  const brandId = req.params.id;
  const newValues = req.body;

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      brandId,
      { name: newValues.name },
      { new: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brend nije pronađen." });
    }

    res.status(200).json(updatedBrand);
  } catch (err) {
    next(err);
  }
};

// Dohvati sve brendove
const getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    next(err);
  }
};

// Dohvati brend po ID-u
const getBrandById = async (req, res, next) => {
  const brandId = req.params.id;

  try {
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return res.status(404).json({ message: "Brend nije pronađen." });
    }

    res.status(200).json(brand);
  } catch (err) {
    next(err);
  }
};

// Brisanje brenda po ID-u
const deleteBrand = async (req, res, next) => {
  const brandId = req.params.id;

  try {
    const deletedBrand = await Brand.findByIdAndDelete(brandId);

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brend nije pronađen." });
    }

    res.status(200).json({ message: "Brend uspešno obrisan." });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBrand, updateBrand, getBrands, getBrandById, deleteBrand };
