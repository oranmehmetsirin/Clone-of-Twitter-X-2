import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhdLvZ82V_IRTBMTAfgfoeGhunR5WzweU",
  authDomain: "twitter-x-110ce.firebaseapp.com",
  projectId: "twitter-x-110ce",
  storageBucket: "twitter-x-110ce.appspot.com",
  messagingSenderId: "205663735395",
  appId: "1:205663735395:web:3e66eb06562d2e7b79f256",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
