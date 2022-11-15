// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH3kN2Vtr-s3pVnUkP6ysUmvh2Q1EXb08",
  authDomain: "chat-app-3de35.firebaseapp.com",
  projectId: "chat-app-3de35",
  storageBucket: "chat-app-3de35.appspot.com",
  messagingSenderId: "145874795178",
  appId: "1:145874795178:web:a9b3e1d74af3528b03eed3",
  measurementId: "G-HKDVS543J1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()
const analytics = getAnalytics(app);