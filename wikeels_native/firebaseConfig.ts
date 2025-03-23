// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH6YfSS6Y-GSm9k53AYIlHdjhkiM2NKEk",
  authDomain: "wikeels.firebaseapp.com",
  projectId: "wikeels",
  storageBucket: "wikeels.firebasestorage.app",
  messagingSenderId: "658295144121",
  appId: "1:658295144121:web:81d16c2a0079aa77a42568",
  measurementId: "G-XLGFEKHJ33"
};

// Initialize Firebase
if (typeof window === "undefined") {
  global.window = {} as any;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };