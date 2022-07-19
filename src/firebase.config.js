// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaaHGWdfi0zOg0ZyAWukUfe4FYpVGfZBk",
  authDomain: "sellit-411da.firebaseapp.com",
  projectId: "sellit-411da",
  storageBucket: "sellit-411da.appspot.com",
  messagingSenderId: "886473614919",
  appId: "1:886473614919:web:c7410ff43b7a8bc862f362",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
