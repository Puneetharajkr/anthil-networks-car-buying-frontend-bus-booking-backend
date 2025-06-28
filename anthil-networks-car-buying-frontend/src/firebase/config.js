import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCalPK-P2-Pm5Is0mZYa0fh3QVmenFiUHE",
  authDomain: "car-buying-app-826a1.firebaseapp.com",
  projectId: "car-buying-app-826a1",
  storageBucket: "car-buying-app-826a1.appspot.com", 
  messagingSenderId: "170881070573",
  appId: "1:170881070573:web:8cbc0a26ec6074a93ca3e4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
