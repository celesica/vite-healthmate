import React, {useEffect, useState} from 'react';
import {useAppContext} from '../../context/AppContext';
import {collection, doc, getDocs, getFirestore, onSnapshot, setDoc, addDoc} from 'firebase/firestore';
import {useAuth} from "../../context/AuthContext.jsx";
import moment from "moment";

const GlucoseTracker = () => {
    const {state, dispatch} = useAppContext();
    const {currentUser} = useAuth();
    const [glucoseData, setGlucoseData] = useState({submissionDate: null, glucoseValue: null, timing: null});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newGlucoseValue, setNewGlucoseValue] = useState('');
    const [timing, setTiming] = useState('Before Meal');

    useEffect(() => {
        const fetchData = () => {
            const db = getFirestore();
            const glucoseTrackerRef = collection(db, 'glucoseTracker');

            return onSnapshot(glucoseTrackerRef, (querySnapshot) => {
                const currentUserDocs = querySnapshot.docs.filter(doc => doc.data().userID === currentUser.uid);

                if (currentUserDocs.length > 0) {
                    const latestGlucoseData = currentUserDocs.reduce((prev, current) => {
                        return (prev.data().submissionDate > current.data().submissionDate) ? prev : current;
                    });

                    setGlucoseData(latestGlucoseData.data());
                }
            });
        };

        if (currentUser) {
            const unsubscribe = fetchData();
            return () => {
                unsubscribe();
            };
        }
    }, [currentUser]);




    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getFirestore();
        const glucoseTrackerRef = collection(db, 'glucoseTracker');
        const querySnapshot = await getDocs(glucoseTrackerRef);
        const incrementingValue = querySnapshot.size + 1;
        const documentName = `GT${incrementingValue}-${currentUser.uid}`;
        const submissionDate = new Date();
        let glucoseLevel = "Not Defined";

        if (newGlucoseValue >= 70 && newGlucoseValue <= 99) {
            glucoseLevel = "Normal";
        } else if (newGlucoseValue >= 100 && newGlucoseValue <= 125) {
            glucoseLevel = "Prediabetes";
        } else if (newGlucoseValue >= 126) {
            glucoseLevel = "Diabetes";
        }

        const glucoseTrackerRefWithConverter = glucoseTrackerRef.withConverter({
            toFirestore: (data) => data,
            fromFirestore: (snapshot, options) => snapshot.data(options),
        });

        await setDoc(doc(glucoseTrackerRefWithConverter, documentName), {
            submissionDate,
            glucoseValue: parseInt(newGlucoseValue, 10),
            timing,
            glucoseLevel,
            userID: currentUser.uid,
        });

        setShowModal(false);
    };


    console.log(glucoseData.submissionDate);

    return (
        <>
            <div className="card" onClick={handleModalOpen}>
                <h3 className="text-xl font-bold">Latest Glucose Check:</h3>
                <p className="text-gray-500">Date: {moment(glucoseData.submissionDate?.toDate()).format('MMMM Do YYYY, h:mm a')}</p>
                <p className="text-gray-500">Glucose Value: {glucoseData.glucoseValue}</p>
                <p className="text-gray-500">Timing: {glucoseData.timing}</p>
                <p className="text-blue-500 hover:underline cursor-pointer">Log New Entry</p>
            </div>

            {showModal && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-xl font-bold mb-4">Log New Entry</h3>
                            <label htmlFor="glucoseValue" className="block font-medium mb-2">Glucose Value:</label>
                            <input type="number" id="glucoseValue" value={newGlucoseValue}
                                   onChange={(e) => setNewGlucoseValue(e.target.value)}
                                   className="border rounded-lg py-2 px-3 mb-4 w-full" required/>

                            <label htmlFor="timing" className="block font-medium mb-2">Timing:</label>
                            <select id="timing" value={timing} onChange={(e) => setTiming(e.target.value)}
                                    className="border rounded-lg py-2 px-3 mb-4 w-full" required>
                                <option value="Before Meal">Before Meal</option>
                                <option value="After Meal">After Meal</option>
                                <option value="Bedtime">Bedtime</option>
                                <option value="Just Woke Up">Just Woke Up</option>
                                <option value="Exercise">Exercise</option>
                                <option value="Fasting">Fasting</option>
                            </select>

                            <div className="flex justify-end">
                                <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-4"
                                        onClick={handleModalClose}>Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default GlucoseTracker;