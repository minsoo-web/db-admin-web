// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf0jwoliB7VmADgm1dQYZ__AaxfwJ32YM",
  authDomain: "erica-db.firebaseapp.com",
  projectId: "erica-db",
  storageBucket: "erica-db.appspot.com",
  messagingSenderId: "333085499308",
  appId: "1:333085499308:web:0ba1f66d6dc37d66d1a409",
}

// Initialize Firebase
initializeApp(firebaseConfig)

const auth = getAuth()
const db = getFirestore()
export { auth, db }
