import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAdAqylAcKdmSPPkhy_2sHX6j1bvQpLLQ",
  authDomain: "vietkhiem-dc293.firebaseapp.com",
  projectId: "vietkhiem-dc293",
  storageBucket: "vietkhiem-dc293.appspot.com",
  messagingSenderId: "97718843670",
  appId: "1:97718843670:web:95c3abfd02d245fe33b837",
  measurementId: "G-YJLDM833R3",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
auth.languageCode = "vn";
