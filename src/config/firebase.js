import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC55jntqY3WLwrI26MkSRCW0MHHkxvghDk",
    authDomain: "ine-healthmate.firebaseapp.com",
    projectId: "ine-healthmate",
    storageBucket: "ine-healthmate.appspot.com",
    messagingSenderId: "770210242267",
    appId: "1:770210242267:web:4c740af004f4743de1f6fe",
    measurementId: "G-1YB5XKH2ZP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

async function addUserToFirestore(uid, displayName, email, photoURL, role = 'client') {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
        displayName: displayName,
        email: email,
        photoURL: photoURL,
        role: role
    });
}

export { auth, googleProvider, db, addUserToFirestore };