const User = require("./../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Tajna za JWT — obavezno prebaci u .env fajl u stvarnoj aplikaciji
const JWT_SECRET = "tajna_lozinka";

// Registracija korisnika
async function registerUser(model) {
  const existingUser = await User.findOne({ email: model.email });
  if (existingUser) {
    throw new Error("Korisnik već postoji.");
  }

  const hashPassword = await bcrypt.hash(model.password, 10);

  const user = new User({
    name: model.name,
    email: model.email,
    password: hashPassword, // ispravno hashovana lozinka
  });

  await user.save();
}

// Login korisnika
async function loginUser(model) {
  const user = await User.findOne({ email: model.email }); // KORISTI findOne, NE find
  if (!user) {
    throw new Error("Korisnik nije pronađen.");
  }

  const isMatched = await bcrypt.compare(model.password, user.password);
  if (!isMatched) {
    throw new Error("Pogrešna lozinka.");
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin || false,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin || false,
    },
  };
}

module.exports = { registerUser, loginUser };
