import React from 'react';
import Navbar from '../components/dashboard/Navbar.jsx';
import PillarAssessmentChart from '../components/analytics/PillarAssessmentChart';

const DashboardPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-4">
                <PillarAssessmentChart />
            </div>
        </div>
    );
};

export default DashboardPage;
