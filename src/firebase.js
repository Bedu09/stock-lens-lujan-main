// src/firebase.js

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";



// Tu configuración de Firebase (Cópiala de la consola de Firebase: Project Settings > General)

const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

  storageBucket: "...", // Opcional para este paso

  messagingSenderId: "...", // Opcional

  appId: "..." // Opcional

};



// Inicializar Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



export { db };
