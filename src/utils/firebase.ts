import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile  } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KKEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { firebase, auth, provider, updateProfile };
