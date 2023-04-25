import React, { useState } from 'react';
import Sidenav from '../components/dashboard/Sidenav';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { IoInformationCircle } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import PillarAssessmentChart from '../components/analytics/Charts/PillarAssessmentChart.jsx';
import AssessmentScoreChart from '../components/analytics/Charts/AssessmentScoreChart.jsx';
import GlucoseTracker from "../components/glucoseTracker/GlucoseTracker.jsx";
import GlucoseLevelChart from "../components/glucoseTracker/GlucoseLevelChart.jsx";
import GlucoseTimingChart from "../components/glucoseTracker/GlucoseTimingChart.jsx";

const AnalyticsPage = () => {
    const [selectedChart, setSelectedChart] = useState(null);

    const charts = [
        {
            id: 1,
            title: 'Pillar Assessments',
            chart: <PillarAssessmentChart />,
        },
        {
            id: 2,
            title: 'Fun Assessment',
            chart: <AssessmentScoreChart assessmentName={'Fun'} />,
        },
        {
            id: 3,
            title: 'Sleep Assessment',
            chart: <AssessmentScoreChart assessmentName={'Sleep'} />,
        },
        {
            id: 4,
            title: 'Exercise Assessment',
            chart: <AssessmentScoreChart assessmentName={'Exercise'} />,
        },
        {
            id: 5,
            title: 'Environment Assessment',
            chart: <AssessmentScoreChart assessmentName={'Environment'} />,
        },
        {
            id: 6,
            title: 'Diet Assessment',
            chart: <AssessmentScoreChart assessmentName={'Diet'} />,
        },
        {
            id: 7,
            title: 'Glucose Levels',
            chart: <GlucoseLevelChart />,
        },
        {
            id: 8,
            title: 'Glucose Timing Radar',
            chart: <GlucoseTimingChart />,
        },
    ];

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
                        <p className="font-bold">Track your health charts.</p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    {charts.map((chart) => (
                        <div
                            key={chart.id}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2 cursor-pointer"
                            onClick={() => setSelectedChart(chart)}
                        >
                            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow p-4">
                                {chart.chart}
                            </div>
                            <div className="mt-3 font-medium text-darkTeal font-extrabold text-medium mb-4">{chart.title}</div>
                        </div>
                    ))}
                </div>

                {selectedChart && (
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex items-center justify-center h-screen">
                            <div
                                className="fixed inset-0 transition-opacity"
                                aria-hidden="true"
                                onClick={() => setSelectedChart(null)}
                            >
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-6xl w-full flex flex-col py-16 px-24">
                                <div className="bg-white flex-none text-2xl font-bold mb-4 text-center text-darkTeal">
                                    {selectedChart.title}
                                </div>
                                <div className="bg-white flex-1 overflow-y-auto">
                                    {selectedChart.chart}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyticsPage;
