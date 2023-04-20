import { createContext, useContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, addUserToFirestore } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    userData: JSON.parse(localStorage.getItem('userData')),
    isGoogleUser: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return { ...state, currentUser: action.payload };
        case 'SET_USER_DATA':
            return { ...state, userData: action.payload };
        case 'SET_IS_GOOGLE_USER':
            return { ...state, isGoogleUser: action.payload };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.currentUser) {
            const userRef = doc(db, 'users', state.currentUser.uid);
            getDoc(userRef).then((userDataSnapshot) => {
                if (userDataSnapshot.exists()) {
                    const data = userDataSnapshot.data();
                    dispatch({ type: 'SET_USER_DATA', payload: data });
                    localStorage.setItem('userData', JSON.stringify(data));
                }
            });
        } else {
            dispatch({ type: 'SET_USER_DATA', payload: null });
            localStorage.removeItem('userData');
        }
    }, [state.currentUser]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const providerId = user.providerData[0]?.providerId;
                if (providerId === 'google.com') {
                    dispatch({ type: 'SET_IS_GOOGLE_USER', payload: true });
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
            dispatch({ type: 'SET_CURRENT_USER', payload: user });
            localStorage.setItem('currentUser', JSON.stringify(user));
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    );
};