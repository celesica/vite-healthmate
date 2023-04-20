import React, { createContext, useReducer, useContext } from 'react';
import { getFirestore, collection, doc, getDoc, updateDoc, setDoc, query, where, getDocs, orderBy, limit  } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase';
import { useAuth } from './AuthContext';

initializeApp(firebaseConfig);
const db = getFirestore();

const AssessmentsContext = createContext();

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
            totalScore: 0
        });
    }
};

const saveFormSubmission = async (
    userID,
    formName,
    formType,
    formValues,
    interpretation,
    progress,
    formQuestions,
    testScore,
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

        const mainDocUpdate = {
            userID,
            assessmentsCompleted: mainDocSnapshot.data().assessmentsCompleted + 1,
            lastModified: new Date(),
            recentSubmission: formName,
            funScore: formName === 'Fun Assessment' ? testScore : mainDocSnapshot.data().funScore,
            sleepScore: formName === 'Sleep Assessment' ? testScore : mainDocSnapshot.data().sleepScore,
            totalScore: (formName === 'Fun Assessment' ? testScore : mainDocSnapshot.data().funScore) + (formName === 'Sleep Assessment' ? testScore : mainDocSnapshot.data().sleepScore),
        };

        await updateDoc(mainDocRef, mainDocUpdate);

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
            formScore: testScore,
        };

        // Use setDoc to create a new document with the specified name
        await setDoc(newSubAssessmentRef, submission);
    } else {
        console.error('Assessment does not exist for the given userID');
    }
};

export const AssessmentsProvider = ({ children }) => {
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
        <AssessmentsContext.Provider value={{ state, dispatch, createMainAssessment, saveFormSubmission }}>
            {children}
        </AssessmentsContext.Provider>
    );
};

export const useAssessmentsContext = () => useContext(AssessmentsContext);