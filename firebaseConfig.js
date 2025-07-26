// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB65D0pSGx-fCUz9gXtvSYBln9dIJZhLpo",
    authDomain: "finance-tracker-5545b.firebaseapp.com",
    projectId: "finance-tracker-5545b",
    storageBucket: "finance-tracker-5545b.firebasestorage.app",
    messagingSenderId: "820291731049",
    appId: "1:820291731049:web:62c395a415474a05292cf8",
    measurementId: "G-S881WQZXQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db }