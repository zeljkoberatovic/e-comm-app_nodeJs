const express = require('express');
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Middleware za parsiranje JSON tela
app.use(express.json());

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

// Pokreni konekciju
connectDb();

// Pokreni server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
