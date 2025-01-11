// Import the required Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi7K-5pJcx2-A5n0Kx1ixX-6n_1Gj_wL0",
  authDomain: "website-board-game.firebaseapp.com",
  projectId: "website-board-game",
  storageBucket: "website-board-game.appspot.com", // Corrected: ".app" -> ".appspot.com"
  messagingSenderId: "64710120486",
  appId: "1:64710120486:web:be5f7cceb625c8011442e7",
  measurementId: "G-24CKHPXVKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (if required)
export const analytics = getAnalytics(app);
