import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzcEHAq40OJ59vPDhxg1jHqnKzU-Kshds",
  authDomain: "tinder-clone-833d5.firebaseapp.com",
  projectId: "tinder-clone-833d5",
  storageBucket: "tinder-clone-833d5.appspot.com",
  messagingSenderId: "961635858269",
  appId: "1:961635858269:web:6160acbf4a25dbd6325ab4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
