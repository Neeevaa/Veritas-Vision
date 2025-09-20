
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

// This function now contains the config and initialization logic
// to ensure it only runs when called (on the client-side).
export function getFirebaseApp() {
    const firebaseConfig = {
        apiKey: "AIzaSyBauvOVHec37k2Lw3NuM8KF1GHPx1hKC60",
        authDomain: "studio-2631480391-e838b.firebaseapp.com",
        projectId: "studio-2631480391-e838b",
        storageBucket: "studio-2631480391-e838b.firebasestorage.app",
        messagingSenderId: "984818009071",
        appId: "1:984818009071:web:f30c0731ba56ad72fd6c1a"
      };

    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    }
    return getApp();
}
