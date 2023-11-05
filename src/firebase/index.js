// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPWXfbbwyk71OuXHsu2KMgBfYMBMR9zGY",
  authDomain: "todo-app-d0eb6.firebaseapp.com",
  projectId: "todo-app-d0eb6",
  storageBucket: "todo-app-d0eb6.appspot.com",
  messagingSenderId: "46362406531",
  appId: "1:46362406531:web:b3a1e554d57f3fd541b5b6",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
console.log(firebase);
export default firebase;
