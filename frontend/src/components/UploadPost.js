
import React, { useState } from 'react';
import axios from 'axios';
import './UploadPost.css';


const UploadPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Post uploaded successfully!');
      setTitle('');
      setContent('');
      setImage(null);
    } catch (err) {
      alert('Error uploading post');
    }
  };

  return (
    <div className="upload-wrapper">
      <div className="upload-heading">
        <h1>Upload a New Post</h1>
      </div>

      <div className="upload-container">
        <form className="upload-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            required
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button type="submit">Submit Post</button>
        </form>
      </div>
    </div>
  );
};

export default UploadPost;
