import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-G7bZT77_Dq_MKrP_nrQveCF-hBCOIXM",
  authDomain: "goalmine-bcc41.firebaseapp.com",
  projectId: "goalmine-bcc41",
  storageBucket: "goalmine-bcc41.appspot.com",
  messagingSenderId: "711784131689",
  appId: "1:711784131689:web:73dd5106b87f794961c6f8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();

    return { user, token };
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error("Authentication failed");
  }
};

export { auth, googleSignIn };
