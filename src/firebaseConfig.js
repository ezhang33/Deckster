// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm_fQnjAjV0kI4u_cUZap8IRxzc3V6xCE",
  authDomain: "deckster-c6e89.firebaseapp.com",
  projectId: "deckster-c6e89",
  storageBucket: "deckster-c6e89.appspot.com",
  messagingSenderId: "349802807806",
  appId: "1:349802807806:web:9aa8f4d6a379f8170400af",
  measurementId: "G-T7494VS3E1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };