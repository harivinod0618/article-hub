// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Paste your Firebase config here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPfSUclIb-OnOUoK71kO0J4eBln1IbIpM",
  authDomain: "the-better-india-comments.firebaseapp.com",
  projectId: "the-better-india-comments",
  storageBucket: "the-better-india-comments.firebasestorage.app",
  messagingSenderId: "760843686957",
  appId: "1:760843686957:web:0da41b2365e2598c4c94a4",
  measurementId: "G-YKF41C73YT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
