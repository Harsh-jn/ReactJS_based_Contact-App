// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4QYwMVxuezJ1J3Vvl0n3Azb6HlwcxBEY",
  authDomain: "vite-contact-90727.firebaseapp.com",
  projectId: "vite-contact-90727",
  storageBucket: "vite-contact-90727.appspot.com",
  messagingSenderId: "1045257330436",
  appId: "1:1045257330436:web:682af47ea4a56dad7d3a51"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);