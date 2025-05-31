// src/pages/UpdateProfile.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    age: "",
    image: null,
  });

  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      const data = new FormData();
      data.append("email", user.email);
      data.append("name", formData.name);
      data.append("studentId", formData.studentId);
      data.append("age", formData.age);
      data.append("image", formData.image);

      await axios.post("http://localhost:5000/api/users/updateProfile", data);
      navigate("/user-dashboard");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleSkip = () => {
    navigate("/user-dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Your Profile</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="mb-3 p-2 border w-full rounded"
      />
      <input
        type="text"
        name="studentId"
        placeholder="Student ID"
        onChange={handleChange}
        className="mb-3 p-2 border w-full rounded"
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
        className="mb-3 p-2 border w-full rounded"
      />
      <input
        type="file"
        name="image"
        onChange={handleImageChange}
        className="mb-4 w-full"
      />
      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-all duration-300"
        >
          Submit
        </button>
        <button
          onClick={handleSkip}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-all duration-300"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
