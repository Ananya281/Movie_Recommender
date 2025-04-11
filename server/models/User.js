const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  favoriteGenres: [String],
  favoriteActors: [String],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
