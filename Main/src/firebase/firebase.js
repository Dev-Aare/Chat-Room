import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD3vr5BMDA62_5Uq9V-fZKmJFNEUs2gjqE",
  authDomain: "test-project-12f2a.firebaseapp.com",
  projectId: "test-project-12f2a",
  storageBucket: "test-project-12f2a.firebasestorage.app",
  messagingSenderId: "77990698503",
  appId: "1:77990698503:web:eccef63422a18c602794a2",
  measurementId: "G-BGC05V1HSC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, serverTimestamp, ref, uploadBytes, getDownloadURL };