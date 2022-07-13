import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDfC9V3thtHvMmPE4y33taLtEmR0IIW-RE",
  authDomain: "money-management-proj.firebaseapp.com",
  projectId: "money-management-proj",
  storageBucket: "money-management-proj.appspot.com",
  messagingSenderId: "666505967015",
  appId: "1:666505967015:web:c01d51f4bb423af1643282",
  measurementId: "G-83QCN4ZXQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)