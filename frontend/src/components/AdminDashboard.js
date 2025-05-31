
import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import ViewPosts from "./ViewPosts";
import ViewComments from "./ViewComments";
import axios from "axios";
import UploadPost from "./UploadPost";

import {
  FilePlus,
  MessageSquareText,
  LayoutList,
  LogOut,
} from "lucide-react";

import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [selectedOption, setSelectedOption] = useState("upload");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 700);

  const navigate = useNavigate();

  // Handle sidebar collapse on resize
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log("User signed out");
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    if (selectedOption === "view" || selectedOption === "comments") {
      fetchPosts();
    }
  }, [selectedOption]);

  const handleUpload = async () => {
    if (!title || !content || !imageFile) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", imageFile);

      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Post uploaded successfully!");
      setTitle("");
      setContent("");
      setImageFile(null);
      fetchPosts();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Failed to upload post");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "upload":
        return (
          <div className="upload-form">
            <h2>Upload a New Post</h2>
            <input
              type="text"
              placeholder="Post Title"
              className="input-field small-width"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <textarea
              placeholder="Post Content"
              className="input-field small-width"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <input
              type="file"
              accept="image/*"
              className="input-field small-width"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <br />
            {imageFile && (
              <div>
                <p>Selected Image Preview:</p>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              </div>
            )}
            <br />
            <button
              className="submit-btn"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit Post"}
            </button>
          </div>
        );

      case "view":
        return <ViewPosts posts={posts} />;

      case "comments":
        return <ViewComments posts={posts} />;

      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        {!isCollapsed && <h1>Admin Panel</h1>}
        <ul className="menu-list">
          <li onClick={() => setSelectedOption("upload")}>
            <FilePlus className="icon" /> {!isCollapsed && "Upload Post"}
          </li>
          <li onClick={() => setSelectedOption("view")}>
            <LayoutList className="icon" /> {!isCollapsed && "View My Posts"}
          </li>
          <li onClick={() => setSelectedOption("comments")}>
            <MessageSquareText className="icon" /> {!isCollapsed && "View Comments"}
          </li>
          <li onClick={handleLogout}>
            <LogOut className="icon" /> {!isCollapsed && "Logout"}
          </li>
        </ul>
      </aside>

      <main className="content">{renderContent()}</main>
    </div>
  );
}

export default AdminDashboard;
