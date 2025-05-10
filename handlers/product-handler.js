const Product = require("./../db/product");
const { validationResult } = require('express-validator');

// Kreiranje novog proizvoda
const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const productData = req.body;

    const newProduct = new Product({
      name: productData.name,
      shortDescription: productData.shortDescription,
      description: productData.description,
      price: productData.price,
      discount: productData.discount,
      images: productData.images,
      categoryId: productData.categoryId
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

// Ažuriranje postojećeg proizvoda po ID-u
const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const newValues = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: newValues.name,
        shortDescription: newValues.shortDescription,
        description: newValues.description,
        price: newValues.price,
        discount: newValues.discount,
        images: newValues.images,
        categoryId: newValues.categoryId
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Proizvod nije pronađen." });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// Dohvati sve proizvode
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('categoryId', 'name');
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Dohvati proizvod po ID-u
const getProductById = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId).populate('categoryId', 'name');

    if (!product) {
      return res.status(404).json({ message: "Proizvod nije pronađen." });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Brisanje proizvoda po ID-u
const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Proizvod nije pronađen." });
    }

    res.status(200).json({ message: "Proizvod je uspešno obrisan." });
  } catch (err) {
    next(err);
  }
};

// Dohvati istaknute proizvode
const getFeaturedProducts = async (req, res, next) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).populate('categoryId', 'name');
    res.status(200).json(featuredProducts);
  } catch (err) {
    next(err);
  }
};

// Dohvati nove proizvode
const getNewProducts = async (req, res, next) => {
  try {
    const newProducts = await Product.find({ isNewProduct: true }).populate('categoryId', 'name');
    res.status(200).json(newProducts);
  } catch (err) {
    next(err);
  }
};




module.exports = { createProduct, updateProduct, getProducts, getProductById,
                         deleteProduct, getFeaturedProducts, getNewProducts };
