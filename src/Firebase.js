// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs,
  addDoc
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBd14sGGgte7YoNYai-u3FELSGWUImnxSw",
  authDomain: "learn-language-76e95.firebaseapp.com",
  projectId: "learn-language-76e95",
  storageBucket: "learn-language-76e95.appspot.com",
  messagingSenderId: "680988117586",
  appId: "1:680988117586:web:87ae31c699a066b251ed8b",
  measurementId: "G-J49Q6W36ZR"
};

// Initialize Firebase
initializeApp(firebaseConfig)
console.log('**************Firebase LOADED**************');

//init service
export const db = getFirestore()

//collect ref --> this step only points to that collection, nt actually getting anything from it
export const colRef = collection(db, 'Language')

//get collection data



