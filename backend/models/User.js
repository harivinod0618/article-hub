// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  studentId: String,
  age: Number,
  imageUrl: String,
  profileCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
