import firebase from "firebase/compat/app";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPWXfbbwyk71OuXHsu2KMgBfYMBMR9zGY",
  authDomain: "todo-app-d0eb6.firebaseapp.com",
  projectId: "todo-app-d0eb6",
  storageBucket: "todo-app-d0eb6.appspot.com",
  messagingSenderId: "46362406531",
  appId: "1:46362406531:web:b3a1e554d57f3fd541b5b6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
