const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:storyId", async (req, res) => {
  try {
    const comments = await Comment.find({ storyId: req.params.storyId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
