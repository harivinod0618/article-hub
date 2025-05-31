
import React, { useState, useEffect } from 'react';
import './App.css';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, provider } from './firebase';
import googleLogo from './images/google-logo.png';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [adminCodeInput, setAdminCodeInput] = useState('');
  const [adminCodeVerified, setAdminCodeVerified] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (user && user.email !== "hari1018vinod@gmail.com" && !adminCodeVerified) {
        try {
          const res = await axios.get(`http://localhost:5000/api/users/byEmail/${user.email}`);
          const userData = res.data;

          if (!userData.profileCompleted) {
            setProfileCompleted(false);
            navigate("/update-profile");
          }
        } catch (err) {
          console.error("Error checking profile:", err);
        }
      }
    };

    if (user) {
      checkUserProfile();
    }
  }, [user, adminCodeVerified, navigate]);

  const handleAdminCodeChange = (e) => {
    setAdminCodeInput(e.target.value);
  };

  const handleAdminCodeVerify = () => {
    if (adminCodeInput === '0618') {
      setAdminCodeVerified(true);
      alert("Admin code verified. Now sign in with Google.");
    } else {
      alert("Incorrect admin code.");
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        alert('Sign-in failed');
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setAdminCodeVerified(false);
        setAdminCodeInput('');
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  if (user) {
    // Admin without needing code
    if (user.email === "hari1018vinod@gmail.com") {
      return <AdminDashboard user={user} handleLogout={handleLogout} />;
    }

    // Other users with verified admin code
    if (adminCodeVerified) {
      return <AdminDashboard user={user} handleLogout={handleLogout} />;
    }

    // Regular user dashboard
    return profileCompleted ? (
      <UserDashboard user={user} handleLogout={handleLogout} />
    ) : null;
  }

  return (
    <div className="app-container">
      <h1>Welcome to The Better India Comments</h1>

      <div className="admin-login-box">
        <input
          type="password"
          placeholder="Enter admin code (optional)"
          value={adminCodeInput}
          onChange={handleAdminCodeChange}
          className="admin-input"
        />
        <button className="verify-btn" onClick={handleAdminCodeVerify}>
          Verify Code
        </button>
      </div>

      <button className="google-btn" onClick={signInWithGoogle}>
        <img src={googleLogo} alt="Google logo" className="google-icon" />
        Sign in with Google
      </button>
    </div>
  );
}

export default App;
