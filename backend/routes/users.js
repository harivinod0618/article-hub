// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

router.post("/updateProfile", upload.single("image"), async (req, res) => {
  const { email, name, studentId, age } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const updated = await User.findOneAndUpdate(
      { email },
      {
        name,
        studentId,
        age,
        imageUrl,
        profileCompleted: true,
      },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err });
  }
});

router.get("/byEmail/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user", error: err });
  }
});

module.exports = router;
