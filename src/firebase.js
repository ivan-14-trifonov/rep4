import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbXCWA5-jVoWzCSiF3hHaJ2IomHLNH9kk",
  authDomain: "repertoire-7be78.firebaseapp.com",
  databaseURL: "https://repertoire-7be78-default-rtdb.firebaseio.com",
  projectId: "repertoire-7be78",
  storageBucket: "repertoire-7be78.appspot.com",
  messagingSenderId: "597041251114",
  appId: "1:597041251114:web:8d8ddd1431cf02def39453"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/*export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(getAuth(app), email, password);
}

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
}*/