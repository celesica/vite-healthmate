import React from 'react';
import Sidenav from '../components/dashboard/Sidenav.jsx';
import PillarAssessmentChart from '../components/analytics/Charts/PillarAssessmentChart.jsx';
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx';
import AssessmentCard from "../components/analytics/AssessmentCard.jsx";
import GlucoseTracker from "../components/glucoseTracker/GlucoseTracker.jsx";
import TabGroup from "../components/dashboard/TabGroup.jsx";
import OnlineNotifications from "../components/chat/OnlineNotifications.jsx";

const DashboardPage = () => {
    return (
        <div className="flex h-screen p-5">
            <div className="navbar w-1/5 bg-darkTeal flex-shrink-0 min-h-full z-10 p-4 rounded-lg shadow-lg">
                <Sidenav />
            </div>
            <div className="main w-4/5 ml-auto py-4 px-8">
                <DashboardHeader title="Wellness Overview" />
                <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mt-8 max-w-full">
                    <div className="border-ownTeal border-2 w-full md:col-span-3 bg-white rounded-lg shadow-xl overflow-hidden p-4 flex flex-col">
                        <h2 className="text-lg font-medium mb-2">Pillar Assessment Chart</h2>
                        <div className="p-4 relative">
                            <PillarAssessmentChart />
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
                    </div>
                </div>


                <div className="flex flex-row items-center mt-10">
                    <div className="w-1/3 mr-5">
                        <GlucoseTracker/>
                    </div>
                    <div className="w-2/3 ml-5 card p-6 bg-white rounded-3xl shadow-xl text-center h-full max-w-full px-4 w-full mb-6">
                        <TabGroup />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
