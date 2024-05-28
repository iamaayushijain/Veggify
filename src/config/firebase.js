
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDo7O9LL0sa2HncWSGS3ClbSkD3py3SZY4",
  authDomain: "veggify-6e200.firebaseapp.com",
  projectId: "veggify-6e200",
  storageBucket: "veggify-6e200.appspot.com",
  messagingSenderId: "9452956093",
  appId: "1:9452956093:web:559c70fae0de97fa2b8ad4",
  measurementId: "G-4R622QM956"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
