import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app = null;
if (!getApps().length) {
  if (firebaseConfig.apiKey) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (e) {
      console.warn("Firebase init error:", e);
    }
  }
} else {
  app = getApp();
}

let auth = null;
let db = null;
if (app) {
  try {
    auth = getAuth(app);
  } catch (e) {
    console.warn("Firebase Auth error:", e);
  }
  try {
    db = getFirestore(app);
  } catch (e) {
    console.warn("Firestore error:", e);
  }
}

export { app, auth, db };

