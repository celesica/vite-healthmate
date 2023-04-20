import React, { createContext, useReducer, useContext } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase';
import { AuthProvider, useAuth } from './AuthContext';

initializeApp(firebaseConfig);
const db = getFirestore();

const AppContext = createContext();

const initialState = {
    assessments: [],
    isLoading: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ASSESSMENTS':
            return { ...state, assessments: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentUser } = useAuth();

    const fetchAssessments = async () => {
        try {
            const assessmentsSnapshot = await getDocs(collection(db, 'assessments'));
            const assessments = assessmentsSnapshot.docs.map((doc) => doc.data());
            dispatch({ type: 'SET_ASSESSMENTS', payload: assessments });
        } catch (error) {
            console.error('Error fetching assessments:', error);
        }
    };

    React.useEffect(() => {
        if (currentUser) {
            fetchAssessments();
        } else {
            dispatch({ type: 'SET_ASSESSMENTS', payload: [] });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    }, [currentUser]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);