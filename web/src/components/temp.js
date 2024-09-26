// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpQYqkLffVsdz2s1VdXxuxAltfWuh0IYg",
  authDomain: "floe-web.firebaseapp.com",
  projectId: "floe-web",
  storageBucket: "floe-web.appspot.com",
  messagingSenderId: "248425707655",
  appId: "1:248425707655:web:b6d40960d6590950952022",
  measurementId: "G-DTMQE9XEVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);