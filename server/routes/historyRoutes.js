const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const History = require('../models/History');

router.post('/', async (req, res) => {
  try {
    const { userId, title } = req.body;
    if (!userId || !title) {
      return res.status(400).json({ message: "User ID and title are required" });
    }

    const objectUserId = new mongoose.Types.ObjectId(userId); // ✅ Fix here

    // Check if already exists
    const existing = await History.findOne({ user: objectUserId, title });
    if (existing) {
      console.log("ℹ️ Already exists:", existing);
      return res.status(200).json({ message: "Already in history", history: existing });
    }

    const history = await History.create({ user: objectUserId, title });
    console.log("✅ History saved:", history);
    res.status(201).json({ message: "History saved", history });

  } catch (err) {
    console.error("❌ Error saving history:", err);
    res.status(500).json({ message: "Server error while saving history" });
  }
});

module.exports = router;
