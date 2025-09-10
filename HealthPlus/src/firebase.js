// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config (from console)
const firebaseConfig = {
  apiKey: "AIzaSyCq5wwpomt1dT3yYluUsmkG9WYk9Y6fG7c",
  authDomain: "healthplus07.firebaseapp.com",
  projectId: "healthplus07",
  storageBucket: "healthplus07.appspot.com", // ✅ Fixed here
  messagingSenderId: "837159244876",
  appId: "1:837159244876:web:e7a8be908867df9e15d0e9",
  measurementId: "G-V8JF32H9JJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
