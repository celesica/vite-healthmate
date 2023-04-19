import { collection, doc, getDoc, updateDoc, setDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';

export const createMainAssessment = async (userID, collectionName, docIdPrefix) => {
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

export const saveFormSubmission = async (
    userID,
    formName,
    formType,
    formValues,
    interpretation,
    progress,
    formQuestions,
    totalScore,
    mainCollectionName,
    mainDocIdPrefix,
    subCollectionName,
    subDocIdPrefix
) => {
    const mainDocRef = doc(db, mainCollectionName, `${mainDocIdPrefix} - ${userID}`);
    const mainDocSnapshot = await getDoc(mainDocRef);

    if (mainDocSnapshot.exists()) {
        // Query the most recent document with the same userID
        const subAssessmentsRef = collection(db, subCollectionName);
        const q = query(subAssessmentsRef, where('userID', '==', userID), orderBy('submissionDate', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        // Get the most recent totalScore
        let recentTotalScore = 0;
        querySnapshot.forEach((docSnapshot) => {
            recentTotalScore = docSnapshot.data().formScore;
        });

        const mainDocUpdate = {
            userID,
            assessmentsCompleted: mainDocSnapshot.data().assessmentsCompleted + 1,
            lastModified: new Date(),
            recentSubmission: formName,
            funScore: totalScore,
            sleepScore: mainDocSnapshot.data().sleepScore,
            totalScore: totalScore + mainDocSnapshot.data().sleepScore,
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
            formScore: totalScore,
        };

        // Use setDoc to create a new document with the specified name
        await setDoc(newSubAssessmentRef, submission);
    } else {
        console.error('Assessment does not exist for the given userID');
    }
};
