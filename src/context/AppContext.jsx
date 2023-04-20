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
    displayName: "",
    initials: "",
    randomColor: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ASSESSMENTS':
            return { ...state, assessments: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_DISPLAY_NAME':
            return { ...state, displayName: action.payload };
        case 'SET_INITIALS':
            return { ...state, initials: action.payload };
        case 'SET_RANDOM_COLOR':
            return { ...state, randomColor: action.payload };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentUser, userData } = useAuth();

    const fetchAssessments = async () => {
        try {
            const assessmentsSnapshot = await getDocs(collection(db, 'assessments'));
            const assessments = assessmentsSnapshot.docs.map((doc) => doc.data());
            dispatch({ type: 'SET_ASSESSMENTS', payload: assessments });
        } catch (error) {
            console.error('Error fetching assessments:', error);
        }
    };

    const getInitials = (displayName) => {
        if (!displayName) return "LA";
        return displayName
            .split(' ')
            .map((word) => word[0])
            .join(' ')
            .toUpperCase();
    };

    const generateRandomColor = () => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    };

    const updateDisplayName = () => {
        const displayName = userData?.displayName || currentUser.displayName;
        dispatch({ type: 'SET_DISPLAY_NAME', payload: displayName });

        const initials = getInitials(displayName);
        dispatch({ type: 'SET_INITIALS', payload: initials });

        const randomColor = generateRandomColor();
        dispatch({ type: 'SET_RANDOM_COLOR', payload: randomColor });
    };

    React.useEffect(() => {
        if (currentUser) {
            fetchAssessments();
            updateDisplayName();
        } else {
            dispatch({ type: 'SET_ASSESSMENTS', payload: [] });
            dispatch({ type: 'SET_DISPLAY_NAME', payload: "" });
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    }, [currentUser, userData]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
