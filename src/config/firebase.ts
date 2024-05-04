import { initializeApp, } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxd0QZAWMpmLq1jg8v39KZmV1dwQ0f3ys",
  authDomain: "planet0-blockathon.firebaseapp.com",
  projectId: "planet0-blockathon",
  storageBucket: "planet0-blockathon.appspot.com",
  messagingSenderId: "1095014508316",
  appId: "1:1095014508316:web:feb97230288cf5da227cd9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
