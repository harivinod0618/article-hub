const mongoose = require('mongoose');



const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String, // ✅ rename this
  likes: [{ type: String }],
  comments: [
    {
      userId: String,
      userName: String,
      text: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
