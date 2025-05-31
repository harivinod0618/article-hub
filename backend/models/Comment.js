const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  storyId: String,
  userName: String,
  userEmail: String,
  userImage: String,
  commentText: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
