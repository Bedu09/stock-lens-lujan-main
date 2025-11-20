import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";



// Configuración usando las variables de entorno que pusiste en Vercel

const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

  // Estos valores no son secretos, los tomé de tu captura de pantalla

  storageBucket: "mlujanstock-db.firebasestorage.app",

  messagingSenderId: "307363863583",

  appId: "1:307363863583:web:7fd897d0c8f8536459492a"

};



// Inicializar la App de Firebase

const app = initializeApp(firebaseConfig);



// Exportar la base de datos para usarla en el resto de la app

export const db = getFirestore(app);
