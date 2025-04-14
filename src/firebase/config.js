
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Timestamp as timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO9rCkn0JKMe-a7guTJm85WzYH6T6sbGI",
  authDomain: "projectcollabingsite.firebaseapp.com",
  projectId: "projectcollabingsite",
  storageBucket: "projectcollabingsite.firebasestorage.app",
  messagingSenderId: "971307413778",
  appId: "1:971307413778:web:be02ccf455a63a501183cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { db, auth, storage, timestamp };
