import React from 'react';
import SleepAssessment from '../../components/assessments/SleepAssessment.jsx';

const SleepAssessmentPage = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Sleep Assessment</h1>
            <SleepAssessment />
        </div>
    );
};

export default SleepAssessmentPage;
