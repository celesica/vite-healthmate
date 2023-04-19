import { collection, doc, getDoc, updateDoc, setDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';

export const createPillarAssessment = async (userID) => {
    const mainDocRef = doc(db, 'pillarAssessments', `PA - ${userID}`);

    const mainDocSnapshot = await getDoc(mainDocRef);
    if (!mainDocSnapshot.exists()) {
        await setDoc(mainDocRef, {
            userID,
            assessmentsCompleted: 0,
            createdDate: new Date(),
            interpretation: 'Complete all pillar assessments',
            lastModified: new Date(),
            recentSubmission: '',
            funScore: 0,
            sleepScore: 0,
            totalScore: 0,
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
    totalScore
) => {
    const mainDocRef = doc(db, 'pillarAssessments', `PA - ${userID}`);
    const mainDocSnapshot = await getDoc(mainDocRef);

    if (mainDocSnapshot.exists()) {
        // Query the most recent document with the same userID
        const funAssessmentsRef = collection(db, 'funAssessments');
        const q = query(funAssessmentsRef, where('userID', '==', userID), orderBy('submissionDate', 'desc'), limit(1));
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
            funScore: recentTotalScore,
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
        const newFunAssessmentRef = doc(db, 'funAssessments', `FA${nextNumber} - ${userID}`);

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
        await setDoc(newFunAssessmentRef, submission);
    } else {
        console.error('Pillar assessment does not exist for the given userID');
    }
};