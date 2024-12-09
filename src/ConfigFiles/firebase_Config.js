import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const {
  VITE_EMPMANAGE_apiKey,
  VITE_EMPMANAGE_authDomain,
  VITE_EMPMANAGE_projectId,
  VITE_EMPMANAGE_storageBucket,
  VITE_EMPMANAGE_messagingSenderId,
  VITE_EMPMANAGE_appId,
  VITE_EMPMANAGE_measurementId,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_EMPMANAGE_apiKey,
  authDomain: VITE_EMPMANAGE_authDomain,
  projectId: VITE_EMPMANAGE_projectId,
  storageBucket: VITE_EMPMANAGE_storageBucket,
  messagingSenderId: VITE_EMPMANAGE_messagingSenderId,
  appId: VITE_EMPMANAGE_appId,
  measurementId: VITE_EMPMANAGE_measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
