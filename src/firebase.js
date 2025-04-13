import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "goalmine-bcc41.firebaseapp.com",
  projectId: "goalmine-bcc41",
  storageBucket: "goalmine-bcc41.firebasestorage.app",
  messagingSenderId: "711784131689",
  appId: "1:711784131689:web:73dd5106b87f794961c6f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with the app instance
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Configure Google provider
provider.setCustomParameters({
  prompt: "select_account",
});

export { auth, provider };
