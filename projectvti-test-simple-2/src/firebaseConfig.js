// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkLRLLU-HXSdxnfeVTp9LbJsUphSyUqY4",
  authDomain: "vtireactjs.firebaseapp.com",
  projectId: "vtireactjs",
  storageBucket: "vtireactjs.appspot.com",
  messagingSenderId: "577290454396",
  appId: "1:577290454396:web:268473527e4d4889b990f9",
  measurementId: "G-WT6L5H1KHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const database = getAuth(app);

const analytics = getAnalytics(app);