//Create a Firebase Project
//Install Firebase in my Project
//Set Up Firebase Configuration
//Enable Firebase Authentication
//Enable Firebase Database

// Add the Firebase Authentication JS SDK and initialize Firebase Authentication:
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//To use their database
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApNEyvzkhxa8Jo0oTiTtrDN3nIP_ZnMVs",
  authDomain: "clone-a047b.firebaseapp.com",
  projectId: "clone-a047b",
  storageBucket: "clone-a047b.firebasestorage.app",
  messagingSenderId: "219607312683",
  appId: "1:219607312683:web:1e53c8fc0a6c44a0933d6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
