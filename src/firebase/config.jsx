// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA65o1dA5xB_FK32cE29q1qrLMATMir99o",
  authDomain: "miniblog-bf481.firebaseapp.com",
  projectId: "miniblog-bf481",
  storageBucket: "miniblog-bf481.appspot.com",
  messagingSenderId: "490321391502",
  appId: "1:490321391502:web:9fbe794fe16852fbdd7edf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)