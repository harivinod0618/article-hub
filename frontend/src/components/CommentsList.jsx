import { useEffect, useState } from "react";
import axios from "axios";

const CommentsList = ({ storyId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/comments/${storyId}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [storyId]);

  return (
    <div>
      {comments.map(comment => (
        <div key={comment._id} className="comment">
          <img src={comment.userImage} alt="Profile" width={40} />
          <div>
            <strong>{comment.userName}</strong>
            <p>{comment.commentText}</p>
            <small>{new Date(comment.createdAt).toLocaleString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
