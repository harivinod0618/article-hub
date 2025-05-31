
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const Post = require("../models/Post");
// const fs = require("fs");
// const path = require("path");

// // Multer config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ storage: storage });

// // Upload a new post
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//     const newPost = new Post({ title, content, imageUrl });
//     await newPost.save();

//     res.status(201).json({ message: "Post uploaded successfully!", post: newPost });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to upload post", error });
//   }
// });

// // Get all posts
// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ createdAt: -1 });
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch posts", error });
//   }
// });



// // DELETE /api/posts/comments/:id
// router.delete('/comments/:id', async (req, res) => {
//   try {
//     await Comment.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Comment deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete comment" });
//   }
// });

// // Delete a post
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post not found" });

//     if (post.imageUrl) {
//       const imagePath = path.join(__dirname, "..", post.imageUrl);
//       if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//     }

//     await Post.deleteOne({ _id: req.params.id });

//     res.json({ message: "Post deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete post", error });
//   }
// });

// // Update a post
// router.put("/:id", async (req, res) => {
//   try {
//     const { title, content } = req.body;

//     const updatedPost = await Post.findByIdAndUpdate(
//       req.params.id,
//       { title, content },
//       { new: true }
//     );

//     if (!updatedPost) return res.status(404).json({ message: "Post not found" });

//     res.json({ message: "Post updated successfully", post: updatedPost });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update post", error });
//   }
// });

// // Like/Unlike a post
// router.post("/:id/like", async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post not found" });

//     if (!post.likes.includes(userId)) {
//       post.likes.push(userId);
//     } else {
//       post.likes = post.likes.filter(id => id !== userId); // Toggle like
//     }

//     await post.save();
//     res.json({ message: "Like toggled", likes: post.likes });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to like post", error });
//   }
// });

// // Comment on a post
// router.post("/:id/comment", async (req, res) => {
//   const { userId, userName, text } = req.body;
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ message: "Post not found" });

//     post.comments.push({ userId, userName, text });
//     await post.save();

//     res.json({ message: "Comment added", comments: post.comments });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add comment", error });
//   }
// });

// // ✅ New route to get all comments
// router.get("/comments", async (req, res) => {
//   try {
//     const posts = await Post.find({}, "title comments");
//     const allComments = [];

//     posts.forEach((post) => {
//       post.comments.forEach((comment) => {
//         allComments.push({
//           postId: post._id,
//           postTitle: post.title,
//           userId: comment.userId,
//           userName: comment.userName,
//           text: comment.text,
//         });
//       });
//     });

//     res.json(allComments);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch comments", error });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/Posts");
const fs = require("fs");
const path = require("path");

// Multer config
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

// Upload a new post
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({ title, content, imageUrl });
    await newPost.save();

    res.status(201).json({ message: "Post uploaded successfully!", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload post", error });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.imageUrl) {
      const imagePath = path.join(__dirname, "..", post.imageUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Post.deleteOne({ _id: req.params.id });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error });
  }
});

// Like/Unlike a post
router.post("/:id/like", async (req, res) => {
  const { userId } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter(id => id !== userId);
    }

    await post.save();
    res.json({ message: "Like toggled", likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: "Failed to like post", error });
  }
});

// Comment on a post
router.post("/:id/comment", async (req, res) => {
  const { userId, userName, text } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ userId, userName, text });
    await post.save();

    res.json({ message: "Comment added", comments: post.comments });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error });
  }
});

// ✅ Get all comments across posts
router.get("/comments", async (req, res) => {
  try {
    const posts = await Post.find({}, "title comments");
    const allComments = [];

    posts.forEach((post) => {
      post.comments.forEach((comment) => {
        allComments.push({
          commentId: comment._id,
          postId: post._id,
          postTitle: post.title,
          userName: comment.userName,
          text: comment.text,
        });
      });
    });

    res.json(allComments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
});

// ✅ Delete a specific comment by ID (embedded in a post)
router.delete("/comments/:id", async (req, res) => {
  const commentId = req.params.id;

  try {
    const post = await Post.findOne({ "comments._id": commentId });
    if (!post) return res.status(404).json({ message: "Comment not found" });

    post.comments = post.comments.filter(c => c._id.toString() !== commentId);
    await post.save();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error });
  }
});

module.exports = router;
