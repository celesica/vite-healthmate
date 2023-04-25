import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidenav from '../components/dashboard/Sidenav';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import FunAssessment from "../components/assessments/FunAssessment";
import SleepAssessment from "../components/assessments/SleepAssessment";
import ExerciseAssessment from "../components/assessments/ExerciseAssessment";
import EnvironmentAssessment from "../components/assessments/EnvironmentAssessment";
import DietAssessment from "../components/assessments/DietAssessment.jsx";
import { IoInformationCircle } from 'react-icons/io5';
import { useChartDataContext } from "../context/ChartDataContext.jsx";

const TestPages = () => {
    const searchParams = new URLSearchParams(useLocation().search);
    const assessmentType = searchParams.get('assessmentType');
    const { state, dispatch, loading, hasChartData } = useChartDataContext();

    let assessmentComponent;

    if (assessmentType === 'fun') {
        assessmentComponent = <FunAssessment />;
    } else if (assessmentType === 'sleep') {
        assessmentComponent = <SleepAssessment />;
    } else if (assessmentType === 'exercise') {
        assessmentComponent = <ExerciseAssessment />;
    } else if (assessmentType === 'environment') {
        assessmentComponent = <EnvironmentAssessment />;
    } else if (assessmentType === 'diet') {
        assessmentComponent = <DietAssessment />;
    }

    return (
        <div className="flex h-screen p-5">
            <div className="navbar w-1/5 bg-darkTeal flex-shrink-0 min-h-full z-10 p-4 rounded-lg shadow-lg">
                <Sidenav />
            </div>
            <div className="main w-4/5 ml-auto py-4 px-8">
                <DashboardHeader title="Take Charge of Your Health!" />
                <div className="p-4 mb-4 text-lg text-darkTeal rounded-lg bg-superLightTeal dark:bg-gray-800 dark:text-blue-400 border-t-4 border-ownTeal flex items-start" role="alert">
                    <div className="flex-none">
                        <IoInformationCircle className="text-3xl text-ownTeal" />
                    </div>
                    <div className="flex-grow pl-4">
                        <p className="font-bold">Answer each multiple-choice question as accurately as you can according to the point scale.</p>
                        <p>Each multiple choice question has a numeric value that is also your "score" for that question.</p>
                    </div>
                </div>
                <div>{assessmentComponent}</div>
            </div>
        </div>
    );
};

export default TestPages;
