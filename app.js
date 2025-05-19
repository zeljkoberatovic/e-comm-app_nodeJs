const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");

// Importovanje ruta
const categoryRoutes = require("./routes/category");
const brandRoutes = require('./routes/brand');
const productRoutes = require('./routes/product');
const customerRoutes = require('./routes/customer');
const authRoutes = require("./routes/auth");


// Middleware za parsiranje JSON tela
app.use(express.json());
app.use(cors());

// Korišćenje ruta za kategorije
app.use("/category", categoryRoutes);
app.use("/brand", brandRoutes);
app.use("/product", productRoutes);
app.use("/customer", customerRoutes);
app.use("/auth", authRoutes);

// Test ruta
app.get('/', (req, res) => {
  res.send('Server Running!!!!');
});

// Konektovanje sa bazom
async function connectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: "e-comm-store_db"
    });
    console.log("✅ Povezan sa MongoDB!");
  } catch (err) {
    console.error("❌ Greška pri povezivanju sa bazom:", err.message); 
  }
}

// Pokreni konekciju sa bazom
connectDb();

// Globalni error handler za sve rute
app.use((err, req, res, next) => {
  console.error(err.stack); // Logovanje greške na konzolu
  res.status(500).json({ error: 'Došlo je do greške na serveru. Pokušajte ponovo...' });
});

// Pokreni server
app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}`);
});
