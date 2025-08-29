// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoBoGFlTpi1m_-uxvC46FfhyEHCC0zRgM",
  authDomain: "fooddelivery-edbb3.firebaseapp.com",
  projectId: "fooddelivery-edbb3",
  storageBucket: "fooddelivery-edbb3.appspot.com",
  messagingSenderId: "849025418162",
  appId: "1:849025418162:web:48676274a7c6a945f21aab"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;