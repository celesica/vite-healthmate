import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, addUserToFirestore } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    });
    const [userData, setUserData] = useState(() => {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data) : null;
    });

    const [isGoogleUser, setIsGoogleUser] = useState(false);

    useEffect(() => {
        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
            getDoc(userRef).then((userDataSnapshot) => {
                if (userDataSnapshot.exists()) {
                    const data = userDataSnapshot.data();
                    setUserData(data);
                    localStorage.setItem('userData', JSON.stringify(data));
                }
            });
        } else {
            setUserData(null);
            localStorage.removeItem('userData');
        }
    }, [currentUser]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const providerId = user.providerData[0]?.providerId;
                if (providerId === 'google.com') {
                    setIsGoogleUser(true);
                    const userRef = doc(db, 'users', user.uid);
                    const userDataSnapshot = await getDoc(userRef);
                    if (!userDataSnapshot.exists()) {
                        await addUserToFirestore(
                            user.uid,
                            user.displayName,
                            user.email,
                            user.photoURL
                        );
                    }
                }
            }
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
        });

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        userData,
        isGoogleUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};