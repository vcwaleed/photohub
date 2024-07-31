import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC0mljNr83nlR356yiq49GP2DpVzp4xLVE",
    authDomain: "image-bazar-a763e.firebaseapp.com",
    projectId: "image-bazar-a763e",
    storageBucket: "image-bazar-a763e.appspot.com",
    messagingSenderId: "919479240768",
    appId: "1:919479240768:web:56ed2a30608b24b69337a5"
  };
  


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
