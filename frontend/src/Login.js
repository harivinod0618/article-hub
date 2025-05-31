// Login.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase'; // make sure path is correct
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      alert(`Signed in as: ${result.user.displayName}`);
      
      // ✅ Redirect to dashboard
      navigate('/admin');
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
