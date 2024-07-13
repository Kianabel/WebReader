// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4qXcmZoJ_b7Q-7_mqo6Ucb5K0NHBoaXg",
  authDomain: "insiread-1e175.firebaseapp.com",
  databaseURL: "https://insiread-1e175-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "insiread-1e175",
  storageBucket: "insiread-1e175.appspot.com",
  messagingSenderId: "553029464635",
  appId: "1:553029464635:web:22c6fa4aaead99773a621e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;