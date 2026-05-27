import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHVR255DN5caceDSQSNvl2Qc5s_YleSyM",
  authDomain: "spa-uae.firebaseapp.com",
  projectId: "spa-uae",
  storageBucket: "spa-uae.firebasestorage.app",
  messagingSenderId: "313474795051",
  appId: "1:313474795051:web:e46283473fdd839fd14c6e",
  measurementId: "G-ZD7M976JMN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  firebaseSignOut,
  onAuthStateChanged,
};
export type { User };
