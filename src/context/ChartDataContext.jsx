import React, {createContext, useContext, useEffect, useReducer} from 'react';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {useAuth} from './AuthContext';
import {db} from '../config/firebase';

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
        default:
            return state;
    }
};

export const ChartDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentUser } = useAuth();

    const fetchPillarAssessments = () => {
        const pillarAssessmentsRef = collection(db, 'pillarAssessments');
        const orderedPillarAssessments = query(pillarAssessmentsRef, orderBy('submissionDate'));
        return onSnapshot(
            orderedPillarAssessments,
            (snapshot) => {
                const pillarAssessments = snapshot.docs.map((doc) => doc.data());
                dispatch({type: 'SET_PILLAR_ASSESSMENTS', payload: pillarAssessments});
            },
            (error) => {
                console.error('Error fetching pillar assessments:', error);
            }
        );
    };

    const fetchFunAssessments = () => {
        const funAssessmentsRef = collection(db, 'funAssessments');
        const orderedFunAssessments = query(funAssessmentsRef, orderBy('submissionDate'));
        return onSnapshot(
            orderedFunAssessments,
            (snapshot) => {
                const funAssessments = snapshot.docs.map((doc) => doc.data());
                dispatch({type: 'SET_FUN_ASSESSMENTS', payload: funAssessments});
            },
            (error) => {
                console.error('Error fetching fun assessments:', error);
            }
        );
    };

    const fetchSleepAssessments = () => {
        const sleepAssessmentsRef = collection(db, 'sleepAssessments');
        const orderedSleepAssessments = query(sleepAssessmentsRef, orderBy('submissionDate'));
        return onSnapshot(
            orderedSleepAssessments,
            (snapshot) => {
                const sleepAssessments = snapshot.docs.map((doc) => doc.data());
                dispatch({type: 'SET_SLEEP_ASSESSMENTS', payload: sleepAssessments});
            },
            (error) => {
                console.error('Error fetching sleep assessments:', error);
            }
        );
    };

    const fetchExerciseAssessments = () => {
        const exerciseAssessmentsRef = collection(db, 'exerciseAssessments');
        const orderedExerciseAssessments = query(exerciseAssessmentsRef, orderBy('submissionDate'));
        return onSnapshot(
            orderedExerciseAssessments,
            (snapshot) => {
                const exerciseAssessments = snapshot.docs.map((doc) => doc.data());
                console.log('Fetched exerciseAssessments:', exerciseAssessments);
                dispatch({type: 'SET_EXERCISE_ASSESSMENTS', payload: exerciseAssessments});
            },
            (error) => {
                console.error('Error fetching exercise assessments:', error);
            }
        );
    };

    const fetchEnvironmentAssessments = () => {
        const environmentAssessmentsRef = collection(db, 'environmentAssessments');
        const orderedEnvironmentAssessments = query(environmentAssessmentsRef, orderBy('submissionDate'));
        return onSnapshot(
            orderedEnvironmentAssessments,
            (snapshot) => {
                const environmentAssessments = snapshot.docs.map((doc) => doc.data());
                console.log('Fetched environmentAssessments:', environmentAssessments);
                dispatch({type: 'SET_ENVIRONMENT_ASSESSMENTS', payload: environmentAssessments});
            },
            (error) => {
                console.error('Error fetching exercise assessments:', error);
            }
        );
    };

    useEffect(() => {
        const unsubscribePillar = fetchPillarAssessments();
        const unsubscribeFun = fetchFunAssessments();
        const unsubscribeSleep = fetchSleepAssessments();
        const unsubscribeExercise = fetchExerciseAssessments();
        const unsubscribeEnvironment = fetchEnvironmentAssessments();

        // Set loading to false once all data is fetched
        Promise.all([
            unsubscribePillar,
            unsubscribeFun,
            unsubscribeSleep,
            unsubscribeExercise,
            unsubscribeEnvironment,
        ]).then(() => {
            dispatch({ type: 'SET_LOADING', payload: false });
        });

        return () => {
            if (unsubscribePillar) unsubscribePillar();
            if (unsubscribeFun) unsubscribeFun();
            if (unsubscribeSleep) unsubscribeSleep();
            if (unsubscribeExercise) unsubscribeExercise();
            if (unsubscribeEnvironment) unsubscribeEnvironment();
        };
    }, [currentUser]);

    return (
        <ChartDataContext.Provider value={{ state, dispatch }}>
            {children}
        </ChartDataContext.Provider>
    );
};

export const useChartDataContext = () => useContext(ChartDataContext);
