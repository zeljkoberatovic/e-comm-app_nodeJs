const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Za enkripciju lozinke

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

// Enkripcija lozinke pre nego što korisnik bude sačuvan u bazi
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next(); // Ako lozinka nije promenjena, ne treba da je enkriptujemo

  const salt = await bcrypt.genSalt(10); // Generiši salt
  this.password = await bcrypt.hash(this.password, salt); // Enkriptuj lozinku

  next(); // Nastavlja  sa čuvanjem korisnika
});

// Metod za poređenje lozinke pri logovanju
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Poredi unetu lozinku sa enkriptovanom
};

const User = mongoose.model("User", userSchema);
module.exports = User;
