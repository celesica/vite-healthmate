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
    const [userData, setUserData] = useState(() => {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data) : null;
    });

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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
        });

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        userData,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};