const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");

// Importovanje ruta
const categoryRoutes = require("./routes/category");
const brandRoutes = require('./routes/brand-routes');

// Middleware za parsiranje JSON tela
app.use(express.json());
app.use(cors());

// Korišćenje ruta za kategorije
app.use("/category", categoryRoutes);
app.use('/api/brands', brandRoutes);

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
    console.error("❌ Greška pri povezivanju sa bazom:", err.message); // Rukovanje greškom pri povezivanju
  }
}

// Pokreni konekciju sa bazom
connectDb();

// Globalni error handler za sve rute
app.use((err, req, res, next) => {
  console.error(err); // Logovanje greške na konzolu
  res.status(500).json({ error: 'Internal Server Error' });
});

// Pokreni server
app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}`);
});
