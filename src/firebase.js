// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlbXMLvjQ4sN9K5soHUIpXO2GFSR0FF1Q",
  authDomain: "db-admin-8ded5.firebaseapp.com",
  projectId: "db-admin-8ded5",
  storageBucket: "db-admin-8ded5.appspot.com",
  messagingSenderId: "826800820896",
  appId: "1:826800820896:web:b93059e2ca660ee99b6fc5",
}

// Initialize Firebase
initializeApp(firebaseConfig)

const auth = getAuth()
const db = getFirestore()
export { auth, db }
