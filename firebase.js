// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZlP7v_XDZG5gSY6SGpmtCXcKH8R3eLM0",
  authDomain: "moflix-9aa22.firebaseapp.com",
  projectId: "moflix-9aa22",
  storageBucket: "moflix-9aa22.firebasestorage.app",
  messagingSenderId: "239063189628",
  appId: "1:239063189628:web:40ae335c8d2852b67361f9",
  measurementId: "G-WJENH6Y5KY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export default app