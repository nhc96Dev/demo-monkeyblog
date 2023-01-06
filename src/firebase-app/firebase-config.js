import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB0ZJ1z5AOHPn5Z0uhpGOHaIF-Jwvc4pdU",
  authDomain: "monkey-blogging-d816b.firebaseapp.com",
  projectId: "monkey-blogging-d816b",
  storageBucket: "monkey-blogging-d816b.appspot.com",
  messagingSenderId: "276092216763",
  appId: "1:276092216763:web:8231eddfc9310deaec909e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
