
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const uri = "mongodb+srv://hari:9cRZBWAiv3ukcYk5@cluster0.62cws.mongodb.net/betterindia?retryWrites=true&w=majority&appName=Cluster0";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // to serve uploaded images

app.use("/api/posts", postRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/the-better-india-comments", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
