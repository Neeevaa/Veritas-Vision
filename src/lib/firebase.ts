
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBauvOVHec37k2Lw3NuM8KF1GHPx1hKC60",
    authDomain: "studio-2631480391-e838b.firebaseapp.com",
    projectId: "studio-2631480391-e838b",
    storageBucket: "studio-2631480391-e838b.firebasestorage.app",
    messagingSenderId: "984818009071",
    appId: "1:984818009071:web:f30c0731ba56ad72fd6c1a"
  };

// Initialize Firebase for client-side
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);

export { app, auth };
