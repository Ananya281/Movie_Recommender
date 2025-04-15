const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register controller
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email: normalizedEmail, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        favoriteGenres: user.favoriteGenres || [],
        favoriteActors: user.favoriteActors || []
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// Select Genres and Actors Controllers
exports.updatePreferences = async (req, res) => {
  try {
    const { userId, favoriteGenres, favoriteActors } = req.body;

    if (!userId) {
      return res.status(422).json({ message: 'User ID is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        favoriteGenres: favoriteGenres || [],
        favoriteActors: favoriteActors || []
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Preferences saved',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        favoriteGenres: updatedUser.favoriteGenres,
        favoriteActors: updatedUser.favoriteActors
      }
    });
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ message: 'Failed to update preferences' });
  }
};
