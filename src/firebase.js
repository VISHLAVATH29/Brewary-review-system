import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCjm2kmJsgWQiGEZ8BreuGJBBGOMqezzbg",
  authDomain: "brewerysystem-1.firebaseapp.com",
  projectId: "brewerysystem-1",
  storageBucket: "brewerysystem-1.appspot.com",
  messagingSenderId: "27304740695",
  appId: "1:27304740695:web:44d72f21f3ed3c20a7a012",
  measurementId: "G-Z5TK853E85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {app, firestore}