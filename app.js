require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const verifyToken = require("./middleware/auth-middleware");

const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3000;

// Middleware za parsiranje JSON tela
app.use(express.json());
app.use(cors({
  exposedHeaders: ['Authorization']
}));

// Korišćenje ruta za kategorije (zaštićene rutom verifyToken)
app.use("/category", verifyToken, categoryRoutes);
app.use("/brand", brandRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);
app.use("/auth", authRoutes);

// Test ruta
app.get("/", (req, res) => {
  res.send("Server Running!!!!");
});

// Konektovanje sa bazom
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
    });
    console.log("✅ Povezan sa MongoDB!");
  } catch (err) {
    console.error("❌ Greška pri povezivanju sa bazom:", err.message);
    process.exit(1); // Zaustavi server ako konekcija ne uspe
  }
}

// Pokreni konekciju sa bazom
connectDb();

// Globalni error handler za sve rute
app.use((err, req, res, next) => {
  console.error(err.stack); // Logovanje greške na konzolu
  res.status(500).json({ error: "Došlo je do greške na serveru. Pokušajte ponovo..." });
});

// Pokreni server
app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}`);
});
