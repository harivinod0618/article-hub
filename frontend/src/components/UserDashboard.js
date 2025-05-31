
import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";

import {
  BookOpen,
  ThumbsUp,
  MessageCircle,
  User,
  LogOut,
  Menu,
  Heart
} from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import "./UserDashboard.css";


function UserDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("view-posts");
  const [posts, setPosts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetchPosts();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`/api/posts/${postId}/like`, { userId: user.uid });
      fetchPosts();
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  const handleComment = async (postId, comment) => {
    if (!comment.trim()) return;
    try {
      await axios.post(`/api/posts/${postId}/comment`, {
        userId: user.uid,
        userName: user.displayName,
        text: comment.trim()
      });
      fetchPosts();
    } catch (error) {
      console.error("Comment failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (isMobile) setSidebarOpen(false);
  };

  const filteredLikedPosts = posts.filter(post =>
    post.likes.includes(user.uid)
  );
  const filteredCommentedPosts = posts.filter(post =>
    post.comments.some(comment => comment.userId === user.uid)
  );

  return (
    <div className={`user-dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
      {isMobile && (
        <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </button>
      )}

      <aside className={`user-sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="user-greeting">Hello, {user.displayName}</h2>
        <ul className="user-menu">
          <li onClick={() => handleTabClick("profile")}><User size={18} /><span>Profile</span></li>
          <li onClick={() => handleTabClick("view-posts")}><BookOpen size={18} /><span>View Posts</span></li>
          <li onClick={() => handleTabClick("liked-posts")}><ThumbsUp size={18} /><span>Liked Posts</span></li>
          <li onClick={() => handleTabClick("commented-posts")}><MessageCircle size={18} /><span>Commented Posts</span></li>
          <li onClick={handleLogout}><LogOut size={18} /><span>Logout</span></li>
        </ul>
      </aside>

      <main className="user-content">
        {activeTab === "view-posts" && (
          <>
            <h3>Admin Posts</h3>
            {posts.map(post => (
              <PostCard
                key={post._id}
                post={post}
                user={user}
                onLike={handleLike}
                onComment={handleComment}
              />
            ))}
          </>
        )}

        {activeTab === "liked-posts" && (
          <>
            <h3>Posts You've Liked</h3>
            {filteredLikedPosts.length > 0 ? (
              filteredLikedPosts.map(post => (
                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))
            ) : (
              <p>No liked posts yet.</p>
            )}
          </>
        )}

        {activeTab === "commented-posts" && (
          <>
            <h3>Posts You've Commented On</h3>
            {filteredCommentedPosts.length > 0 ? (
              filteredCommentedPosts.map(post => (
                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))
            ) : (
              <p>No commented posts yet.</p>
            )}
          </>
        )}

        {activeTab === "profile" && (
          <div>
            <h3>Profile Info</h3>
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
      </main>
    </div>
  );
}

function PostCard({ post, user, onLike, onComment }) {
  const [showCommentInput, setShowCommentInput] = useState(false);

  return (
    <div className="post-card">
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      {post.imageUrl && (
        <img
          src={`http://localhost:5000${post.imageUrl}`}
          alt="Post"
          className="post-image"
        />
      )}
      <div className="button-group">
        <button
          className={`icon-button ${post.likes.includes(user.uid) ? "liked" : ""}`}
          onClick={() => onLike(post._id)}
          title="Like"
        >
          <Heart
            className="icon"
            size={24}
            color={post.likes.includes(user.uid) ? "red" : "black"}
            fill={post.likes.includes(user.uid) ? "red" : "none"}
          />
          <span className="like-count">({post.likes.length})</span>
        </button>

        <button
          className="icon-button"
          onClick={() => setShowCommentInput(!showCommentInput)}
          title="Comment"
        >
          <MessageCircle className="icon" size={24} />
        </button>
      </div>

      {showCommentInput && (
        <CommentBox postId={post._id} onSubmit={onComment} />
      )}

      <div className="comments">
        {post.comments.map((c, i) => (
          <p key={i}><strong>{c.userName}</strong>: {c.text}</p>
        ))}
      </div>
    </div>
  );
}

function CommentBox({ postId, onSubmit }) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(postId, comment);
    setComment("");
  };

  return (
    <div className="comment-box">
      <input
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default UserDashboard;
