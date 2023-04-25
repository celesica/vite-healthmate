import React from 'react';
import Sidenav from '../components/dashboard/Sidenav.jsx';
import PillarAssessmentChart from '../components/analytics/Charts/PillarAssessmentChart.jsx';
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx';
import AssessmentCard from "../components/analytics/AssessmentCard.jsx";
import GlucoseTracker from "../components/glucoseTracker/GlucoseTracker.jsx";
import TabGroup from "../components/dashboard/TabGroup.jsx";
import TodoList from "../components/dashboard/TodoList.jsx";
import TodoContextProvider from "../components/dashboard/TodoContext.jsx";

const DashboardPage = () => {
    return (
        <div className="flex h-screen p-5">
            <div className="navbar w-1/5 bg-darkTeal flex-shrink-0 min-h-full z-10 p-4 rounded-lg shadow-lg">
                <Sidenav />
            </div>
            <div className="main w-4/5 ml-auto py-4 px-8">
                <DashboardHeader title="Wellness Overview" />
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-8 max-w-full">
                    <div className="pt-0 w-full md:col-span-3 p-4 flex flex-col">
                        <h2 className="text-lg mb-2 font-bold">Pillar Assessments Chart</h2>
                        <div className="mb-4 overflow-hidden p-6 rounded-lg shadow-xl bg-white border-ownTeal border-2">
                            <PillarAssessmentChart />
                        </div>
                        <div className="flex gap-4">
                            <div className="rounded-lg">
                                <div>
                                    <GlucoseTracker />
                                </div>
                            </div>
                            <div className="w-full md:w-2/3 rounded-lg">
                                <div className="rounded-lg shadow-xl bg-white border-ownTeal">
                                    <TabGroup />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:col-span-1 flex flex-col gap-4">
                        <div className="flex-grow">
                            <AssessmentCard assessmentName="Fun"/>
                        </div>
                        <div className="flex-grow">
                            <AssessmentCard assessmentName="Sleep"/>
                        </div>
                        <div className="flex-grow">
                            <AssessmentCard assessmentName="Exercise"/>
                        </div>
                        <div className="flex-grow">
                            <AssessmentCard assessmentName="Environment"/>
                        </div>
                        <div className="flex-grow">
                            <AssessmentCard assessmentName="Diet"/>
                        </div>
                        <div className="flex-grow">
                            <AssessmentCard assessmentName="Outlook"/>
                        </div>
                        <div className="flex-grow">
                            <AssessmentCard assessmentName="Mindfulness"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
