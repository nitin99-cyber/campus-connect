
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration with hardcoded values as requested for immediate integration
const firebaseConfig = {
  apiKey: "AIzaSyBzjKsC_SUdid8LHzkqr9z7mfSYyczbkfQ",
  authDomain: "connect-mmmut.firebaseapp.com",
  projectId: "connect-mmmut",
  storageBucket: "connect-mmmut.firebasestorage.app",
  messagingSenderId: "857813775748",
  appId: "1:857813775748:web:9fc3d8ce91630212bdd9d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in other components
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
