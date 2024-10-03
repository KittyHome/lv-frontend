// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoqZaP8mmu_vhfPK9_npepV8ZqiQIf5dY",
  authDomain: "lucky-village-7386d.firebaseapp.com",
  projectId: "lucky-village-7386d",
  storageBucket: "lucky-village-7386d.appspot.com",
  messagingSenderId: "1049664809292",
  appId: "1:1049664809292:web:6b6613432ac36675e387e9",
  measurementId: "G-JMBBRSV7EH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
