// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-6LQ0IQAYabvGcw75hH-WZ4FWU_MNtlI",
  authDomain: "todo-d7bc8.firebaseapp.com",
  projectId: "todo-d7bc8",
  storageBucket: "todo-d7bc8.appspot.com",
  messagingSenderId: "233041810621",
  appId: "1:233041810621:web:49a76ad797dc0fb37213d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export {auth}

const db = getFirestore(app);

export { db };




