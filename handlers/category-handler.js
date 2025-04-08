const Category = require("./../db/category");

// Kreiranje nove kategorije
const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;

    const newCategory = new Category({
      name: categoryData.name
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (err) {
    console.error("Greška pri kreiranju kategorije:", err);
    res.status(500).json({ error: "Došlo je do greške prilikom kreiranja kategorije." });
  }
};

// Ažuriranje postojeće kategorije po ID-u
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const newValues = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name: newValues.name },
      { new: true } // Vrati novu verziju dokumenta nakon ažuriranja
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Kategorija nije pronađena." });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error("Greška pri ažuriranju kategorije:", err);
    res.status(500).json({ error: "Došlo je do greške prilikom ažuriranja kategorije." });
  }
};


// Dohvati sve kategorije
const getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories); // Vraća sve kategorije
    } catch (err) {
      console.error("Greška pri dohvatanju kategorija:", err);
      res.status(500).json({ error: "Došlo je do greške prilikom dohvatanja kategorija." });
    }
  };
  
  // Dohvati kategoriju po ID-u
  const getCategoryById = async (req, res) => {
    try {
      const categoryId = req.params.id;
      
      // Dohvati kategoriju prema ID-u
      const category = await Category.findById(categoryId);
  
      // Ako kategorija nije pronađena
      if (!category) {
        return res.status(404).json({ message: "Kategorija nije pronađena." });
      }
  
      res.status(200).json(category); // Vraća traženu kategoriju
    } catch (err) {
      console.error("Greška pri dohvatanju kategorije:", err);
      res.status(500).json({ error: "Došlo je do greške prilikom dohvatanja kategorije." });
    }
  };

  // Brisanje kategorije po ID-u
const deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      // Brisanje kategorije prema ID-u
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      // Ako kategorija nije pronađena
      if (!deletedCategory) {
        return res.status(404).json({ message: "Kategorija nije pronađena." });
      }
  
      res.status(200).json({ message: "Kategorija uspešno obrisana." });
    } catch (err) {
      console.error("Greška pri brisanju kategorije:", err);
      res.status(500).json({ error: "Došlo je do greške prilikom brisanja kategorije." });
    }
  };

module.exports = { createCategory, updateCategory, getCategories, getCategoryById, deleteCategory };
