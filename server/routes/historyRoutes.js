const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Save movie to history (Prevent duplicates)
router.post('/', async (req, res) => {
  try {
    const { userId, title } = req.body;
    if (!userId || !title) {
      return res.status(400).json({ message: "User ID and title are required" });
    }

    // ✅ Check if the same user already has this movie in history
    const existing = await History.findOne({ user: userId, title });
    if (existing) {
      return res.status(200).json({ message: "Already in history", history: existing });
    }

    // ✅ If not found, create new history
    const history = await History.create({ user: userId, title });
    res.status(201).json({ message: "History saved", history });

  } catch (err) {
    console.error("❌ Error saving history:", err);
    res.status(500).json({ message: "Server error while saving history" });
  }
});

module.exports = router;
