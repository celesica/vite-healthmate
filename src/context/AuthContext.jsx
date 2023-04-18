import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase';
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
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userData = await getDoc(userRef);
                if (userData.exists()) {
                    setUserData(userData.data());
                }
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        userData,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
