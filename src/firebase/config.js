// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-E6YN4RHZ0AwBhN_hRIkwVSHESZlLwD0",
  authDomain: "react-cursos-4877f.firebaseapp.com",
  projectId: "react-cursos-4877f",
  storageBucket: "react-cursos-4877f.firebasestorage.app",
  messagingSenderId: "1065196646573",
  appId: "1:1065196646573:web:c01eef26735bc0eb579624",
  measurementId: "G-7NMFK19DDD"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);