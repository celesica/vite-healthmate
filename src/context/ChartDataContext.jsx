import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {collection, onSnapshot, orderBy, where, query} from 'firebase/firestore';
import {useAuth} from './AuthContext';
import {db} from '../config/firebase';
import LoadingState from '../components/dashboard/LoadingState';

const ChartDataContext = createContext();

const initialState = {
    chartData: {
        funAssessments: [],
        sleepAssessments: [],
        pillarAssessments: [],
        exerciseAssessments: [],
        environmentAssessments: [],
    },
    loading: true,
    hasChartData: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PILLAR_ASSESSMENTS':
            return { ...state, chartData: { ...state.chartData, pillarAssessments: action.payload }};
        case 'SET_FUN_ASSESSMENTS':
            return { ...state, chartData: { ...state.chartData, funAssessments: action.payload }};
        case 'SET_SLEEP_ASSESSMENTS':
            return { ...state, chartData: { ...state.chartData, sleepAssessments: action.payload }};
        case 'SET_EXERCISE_ASSESSMENTS':
            return { ...state, chartData: { ...state.chartData, exerciseAssessments: action.payload }};
        case 'SET_ENVIRONMENT_ASSESSMENTS':
            return { ...state, chartData: { ...state.chartData, environmentAssessments: action.payload }};
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_HAS_CHART_DATA':
            return { ...state, hasChartData: action.payload };
        default:
            return state;
    }
};

export const ChartDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentUser } = useAuth();

    const fetchAssessments = (collectionName, actionType) => (resolve) => {
        const ref = collection(db, collectionName);
        const orderedQuery = query(ref, orderBy('submissionDate'), where('userID', '==', currentUser.uid));

        return onSnapshot(
            orderedQuery,
            (snapshot) => {
                const assessments = snapshot.docs.map((doc) => doc.data());
                dispatch({ type: actionType, payload: assessments });
                resolve();
            },
            (error) => {
                console.error(`Error fetching ${collectionName}:`, error);
            }
        );
    };

    const updateHasChartData = () => {
        const hasChartData =
            state.chartData.pillarAssessments.length > 0 ||
            state.chartData.funAssessments.length > 0 ||
            state.chartData.sleepAssessments.length > 0 ||
            state.chartData.exerciseAssessments.length > 0 ||
            state.chartData.environmentAssessments.length > 0;
        dispatch({ type: 'SET_HAS_CHART_DATA', payload: hasChartData });
    };

    useEffect(() => {
        updateHasChartData();
    }, [state.chartData]);

    useEffect(() => {
        const assessmentTypes = [
            { collection: 'pillarAssessments', action: 'SET_PILLAR_ASSESSMENTS' },
            { collection: 'funAssessments', action: 'SET_FUN_ASSESSMENTS' },
            { collection: 'sleepAssessments', action: 'SET_SLEEP_ASSESSMENTS' },
            { collection: 'exerciseAssessments', action: 'SET_EXERCISE_ASSESSMENTS' },
            { collection: 'environmentAssessments', action: 'SET_ENVIRONMENT_ASSESSMENTS' },
        ];

        const promises = assessmentTypes.map(({ collection, action }) => {
            return new Promise((resolve) => {
                const unsubscribe = fetchAssessments(collection, action)(resolve);
                return () => unsubscribe && unsubscribe();
            });
        });

        // Set loading to false once all data is fetched
        Promise.all(promises).then(() => {
            dispatch({ type: 'SET_LOADING', payload: false });
        });

        return () => {
            promises.forEach(promise => promise.catch(() => {}));
        };
    }, [currentUser]);

    return (
        <ChartDataContext.Provider value={{ state, dispatch, loading: state.loading, hasChartData: state.hasChartData }}>
            {state.loading ? <LoadingState /> : children}
        </ChartDataContext.Provider>
    );
};

export const useChartDataContext = () => useContext(ChartDataContext);