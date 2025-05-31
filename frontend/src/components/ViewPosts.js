
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash, Save, X } from "lucide-react";
import "./ViewPosts.css";

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("❌ Failed to delete post");
    }
  };

  const startEditing = (post) => {
    setEditingPostId(post._id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditedTitle("");
    setEditedContent("");
  };

  const saveEdit = async (postId) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${postId}`, {
        title: editedTitle,
        content: editedContent,
      });
      setEditingPostId(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("❌ Failed to update post");
    }
  };

  return (
    <div className="view-posts">
      <h2>My Uploaded Posts</h2>
      {posts.length === 0 ? (
        <p>No posts uploaded yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            {editingPostId === post._id ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="input-field"
                />
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="input-field"
                ></textarea>
                <div className="button-group">
                  <button className="btn save-btn" onClick={() => saveEdit(post._id)}>
                    <Save size={16} /> Save
                  </button>
                  <button className="btn cancel-btn" onClick={cancelEditing}>
                    <X size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.imageUrl && (
                  <img
                    src={`http://localhost:5000${post.imageUrl}`}
                    alt={post.title}
                    className="post-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <div className="button-group">
                  <button className="btn edit-btn" onClick={() => startEditing(post)}>
                    <Pencil size={16} /> Edit
                  </button>
                  <button className="btn delete-btn" onClick={() => handleDelete(post._id)}>
                    <Trash size={16} /> Delete
                  </button>
                </div>

                <div className="comment-section">
                  <h4>Comments</h4>
                  {post.comments && post.comments.length > 0 ? (
                    <ul className="comment-list">
                      {post.comments.map((comment, index) => (
                        <li key={`${post._id}-comment-${index}`} className="comment-item">
                          <p><strong>{comment.userName || "Anonymous"}:</strong> {comment.text}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-comments">No comments yet.</p>
                  )}
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewPosts;
