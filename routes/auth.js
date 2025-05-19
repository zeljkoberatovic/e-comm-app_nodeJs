const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");

const router = express.Router();

// Registracija korisnika
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    try {
      await registerUser(req.body); // ✅ ovdje se šalje samo model
      res.json({ message: "Registracija uspješna!" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(400).json({ error: "Unesite ime, email i lozinku" });
  }
});

// Login korisnika
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const result = await loginUser(req.body); // ✅ poziv sa podacima
      res.json(result); // ✅ vrati token i user podatke
    } catch (err) {
      res.status(400).json({ error: err.message }); // detaljna greška
    }
  } else {
    res.status(400).json({ error: "Unesite email i lozinku" });
  }
});

module.exports = router;
