import { useState } from "react";
import axios from "axios";

const CommentForm = ({ storyId, user }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      storyId,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      commentText,
    };

    await axios.post("http://localhost:5000/api/comments", comment);
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        required
        placeholder="Write your comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
