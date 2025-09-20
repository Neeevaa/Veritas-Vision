
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

// This function now contains the config and initialization logic
// to ensure it only runs when called (on the client-side).
export function getFirebaseApp() {
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    }
    return getApp();
}
