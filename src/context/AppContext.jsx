import React, { createContext, useReducer, useContext } from 'react';
import { getFirestore, collection, doc, getDoc, updateDoc, setDoc, query, where, getDocs, orderBy, limit  } from 'firebase/firestore';
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

const createMainAssessment = async (userID, collectionName, docIdPrefix) => {
    const mainDocRef = doc(db, collectionName, `${docIdPrefix} - ${userID}`);

    const mainDocSnapshot = await getDoc(mainDocRef);
    if (!mainDocSnapshot.exists()) {

        await setDoc(mainDocRef, {
            userID,
            assessmentsCompleted: 0,
            createdDate: new Date(),
            interpretation: 'Complete all assessments',
            lastModified: new Date(),
            recentSubmission: '',
            funScore: 0,
            sleepScore: 0,
            exerciseScore: 0,
            environmentScore: 0,
            totalScore: 0
        });
    }
};

const updatePillarAssessments = (mainDocSnapshot, formName, healthScore) => {
    return {
        recentSubmission: formName,
        funScore: formName === 'Fun Assessment' ? healthScore : mainDocSnapshot.data().funScore,
        sleepScore: formName === 'Sleep Assessment' ? healthScore : mainDocSnapshot.data().sleepScore,
        exerciseScore: formName === 'Exercise Assessment' ? healthScore : mainDocSnapshot.data().exerciseScore,
        environmentScore: formName === 'Environment Assessment' ? healthScore : mainDocSnapshot.data().environmentScore,
        totalScore: (formName === 'Fun Assessment' ? healthScore : mainDocSnapshot.data().funScore) +
            (formName === 'Sleep Assessment' ? healthScore : mainDocSnapshot.data().sleepScore) +
            (formName === 'Exercise Assessment' ? healthScore : mainDocSnapshot.data().exerciseScore) +
            (formName === 'Environment Assessment' ? healthScore : mainDocSnapshot.data().environmentScore),
    };
};

// const updateBodyAssessments = (mainDocSnapshot, formName, healthScore) => {
//     return {
//         recentSubmission: formName,
//         digestionLowScore: formName === 'Digestion: Low Stomach Assessment' ? healthScore : mainDocSnapshot.data().digestionLowScore,
//         digestionExcessScore: formName === 'Digestion: Excess Stomach Assessment' ? healthScore : mainDocSnapshot.data().digestionExcessScore,
//     };
// };

const mainDocUpdate = async (mainDocSnapshot, formName, healthScore, userID, mainCollectionName, subCollectionName) => {
    const baseUpdate = {
        userID,
        lastModified: new Date(),
    };

    let collectionSpecificUpdate = {};

    if (mainCollectionName === 'pillarAssessments') {
        collectionSpecificUpdate = updatePillarAssessments(mainDocSnapshot, formName, healthScore);
    } else if (mainCollectionName === 'bodyAssessments') {
        collectionSpecificUpdate = updateBodyAssessments(mainDocSnapshot, formName, healthScore);
    }

    const subAssessmentsRef = collection(db, subCollectionName);
    const q = query(subAssessmentsRef, where('userID', '==', userID), where('formName', '==', formName));
    const querySnapshot = await getDocs(q);

    const alreadySubmitted = querySnapshot.size > 0;

    const assessmentsCompletedUpdate = {
        assessmentsCompleted: alreadySubmitted ? mainDocSnapshot.data().assessmentsCompleted : mainDocSnapshot.data().assessmentsCompleted + 1,
    };

    return {
        ...baseUpdate,
        ...assessmentsCompletedUpdate,
        ...collectionSpecificUpdate,
    };
};

const saveFormSubmission = async (
    userID,
    formName,
    formType,
    formValues,
    interpretation,
    progress,
    formQuestions,
    healthScore,
    mainCollectionName,
    mainDocIdPrefix,
    subCollectionName,
    subDocIdPrefix
) => {
    const mainDocRef = doc(db, mainCollectionName, `${mainDocIdPrefix} - ${userID}`);
    const mainDocSnapshot = await getDoc(mainDocRef);

    if (mainDocSnapshot.exists()) {
        const subAssessmentsRef = collection(db, subCollectionName);
        const q = query(subAssessmentsRef, where('userID', '==', userID), orderBy('submissionDate', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        let recentTestScore = 0;
        querySnapshot.forEach((docSnapshot) => {
            recentTestScore = docSnapshot.data().formScore;
        });

        const mainDocUpdateData = await mainDocUpdate(mainDocSnapshot, formName, healthScore, userID, mainCollectionName, subCollectionName);

        await updateDoc(mainDocRef, mainDocUpdateData);

        // Determine the next available number
        let nextNumber = 1;
        querySnapshot.forEach((docSnapshot) => {
            const docNumber = parseInt(docSnapshot.id.split('-')[0].substring(2), 10);
            if (docNumber >= nextNumber) {
                nextNumber = docNumber + 1;
            }
        });

        // Set the reference to point to a new document with the incrementing value
        const newSubAssessmentRef = doc(db, subCollectionName, `${subDocIdPrefix}${nextNumber} - ${userID}`);

        const submissionDate = new Date();
        const formStatus = progress === 100 ? 'Completed' : 'In Progress';

        const submission = {
            userID,
            submissionDate,
            interpretation,
            formName,
            formType,
            formStatus,
            formProgress: progress,
            formQuestions,
            formAnswers: formValues,
            formScore: healthScore,
        };

        // Use setDoc to create a new document with the specified name
        await setDoc(newSubAssessmentRef, submission);
    } else {
        console.error('Assessment does not exist for the given userID');
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
        <AppContext.Provider value={{ state, dispatch, createMainAssessment, saveFormSubmission }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

