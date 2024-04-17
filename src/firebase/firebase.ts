import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import { getStorage }from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBEjnw1h371yVBHG7_kh_5NLwnV7R4cm3s",
  authDomain: "soyombo-63612.firebaseapp.com",
  projectId: "soyombo-63612",
  storageBucket: "soyombo-63612.appspot.com",
  messagingSenderId: "716051448612",
  appId: "1:716051448612:web:fd7a1815b471a245ea29b1",
  measurementId: "G-5N48Q6GK3W"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage();