// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOx8GrVa9BHXpQMK_2iJBA5n5eOLQ7ooU",
  authDomain: "ecommerce-app-9ed62.firebaseapp.com",
  projectId: "ecommerce-app-9ed62",
  storageBucket: "ecommerce-app-9ed62.firebasestorage.app",
  messagingSenderId: "18476085326",
  appId: "1:18476085326:web:bea493fa3620b80eb6d31f",
  measurementId: "G-DJMGJY377G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);