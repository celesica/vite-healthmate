import React, { createContext, useReducer, useContext } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const ChartDataContext = createContext();

const initialState = {
    chartData: {
        funAssessments: [],
        sleepAssessments: [],
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHART_DATA':
            return { ...state, chartData: action.payload };
        default:
            return state;
    }
};

export const ChartDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentUser } = useAuth();

    const fetchChartData = async () => {
        try {
            const funAssessmentsSnapshot = await getDocs(collection(db, 'funAssessments'));
            const sleepAssessmentsSnapshot = await getDocs(collection(db, 'sleepAssessments'));

            const funAssessments = funAssessmentsSnapshot.docs.map((doc) => doc.data());
            const sleepAssessments = sleepAssessmentsSnapshot.docs.map((doc) => doc.data());

            const chartData = {
                funAssessments,
                sleepAssessments,
            };

            dispatch({ type: 'SET_CHART_DATA', payload: chartData });
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    React.useEffect(() => {
        if (currentUser) {
            fetchChartData();
        }
    }, [currentUser]);

    return (
        <ChartDataContext.Provider value={{ state, dispatch }}>
            {children}
        </ChartDataContext.Provider>
    );
};

export const useChartDataContext = () => useContext(ChartDataContext);
