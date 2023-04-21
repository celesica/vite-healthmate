import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { db } from '../config/firebase';

const UpdateDataContext = createContext();

const initialUpdateDataState = {
    lastUpdatedAt: null,
};

export const UpdateDataProvider = ({ children }) => {
    const [state, setState] = useState(initialUpdateDataState);
    const { currentUser } = useAuth();

    const updateData = async (fetchFunction) => {
        try {
            const data = await fetchFunction();
            console.log('Data updated:', data);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    useEffect(() => {
        if (!currentUser) return;

        const fetchLastUpdatedAt = async () => {
            const updateDatesRef = collection(db, 'updateDates');
            const orderedUpdateDates = query(updateDatesRef, orderBy('updatedAt', 'desc'), limit(1));
            return onSnapshot(
                orderedUpdateDates,
                (snapshot) => {
                    if (!snapshot.empty) {
                        const lastUpdatedAt = snapshot.docs[0].data().updatedAt.toDate();
                        setState({ lastUpdatedAt });
                    }
                },
                (error) => {
                    console.error('Error fetching last update date:', error);
                }
            );
        };

        const unsubscribe = fetchLastUpdatedAt();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [currentUser]);

    return (
        <UpdateDataContext.Provider value={{ ...state, updateData }}>
            {children}
        </UpdateDataContext.Provider>
    );
};

export const useUpdateDataContext = () => useContext(UpdateDataContext);
