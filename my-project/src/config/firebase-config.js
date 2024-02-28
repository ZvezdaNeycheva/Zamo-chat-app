// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcrNZcJ2hfUCM_dbJa6xJPJ0Gej3cgtvY",
  authDomain: "final-project-456f5.firebaseapp.com",
  projectId: "final-project-456f5",
  storageBucket: "final-project-456f5.appspot.com",
  messagingSenderId: "938556894180",
  appId: "1:938556894180:web:e445fd101facddb02a35f1",
  databaseURL: "https://final-project-456f5-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

// copilot suggetion
// export const storage = getStorage(app);
// export const messaging = getMessaging(app);
// export const functions = getFunctions(app);

