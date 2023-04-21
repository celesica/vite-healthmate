import React from 'react';
import Sidenav from '../components/dashboard/Sidenav.jsx';
import PillarAssessmentChartD3 from '../components/analytics/PillarAssessmentChart-D3.jsx';
import PillarAssessmentChart from '../components/analytics/PillarAssessmentChart.jsx';
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx';

const DashboardPage = () => {
    return (
        <div className="flex h-screen p-5">
            <div className="navbar w-1/5 bg-darkTeal flex-shrink-0 min-h-full z-10 p-4 rounded-lg shadow-lg">
                <Sidenav />
            </div>
            <div className="main w-4/5 ml-auto py-4 px-8">
                <DashboardHeader />
                <div className="bg-white rounded-lg shadow-xl overflow-hidden p-4">
                    <h2 className="text-lg font-medium mb-2">Pillar Assessment Chart</h2>
                    <div className="p-4">
                        <PillarAssessmentChart />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
