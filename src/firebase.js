import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase config
// Get this from Firebase Console > Project Settings > Your apps > Firebase SDK snippet
const firebaseConfig = {
  apiKey: "AIzaSyD6O53A9qZyoWRvHzjDLFviPPGmRrlYPxI",
  authDomain: "reference-be7cf.firebaseapp.com",
  projectId: "reference-be7cf",
  storageBucket: "reference-be7cf.firebasestorage.app",
  messagingSenderId: "184074744732",
  appId: "1:184074744732:web:316ae56e303e23e2880e59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
