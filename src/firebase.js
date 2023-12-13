import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCQoWZfkF_iJC9s7HNaHfmZWeG2tGvKo8s",
  authDomain: "superslinkyapi.firebaseapp.com",
  projectId: "superslinkyapi",
  storageBucket: "superslinkyapi.appspot.com",
  messagingSenderId: "1354562381",
  appId: "1:1354562381:web:acdd5cbb7f1000faad1504",
  measurementId: "G-1W8NNZXX3Z"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();