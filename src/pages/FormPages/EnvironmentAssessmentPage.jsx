import React from 'react';
import EnvironmentAssessment from '../../components/assessments/EnvironmentAssessment.jsx';

const EnvironmentAssessmentPage = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Environment Assessment</h1>
            <EnvironmentAssessment />
        </div>
    );
};

export default EnvironmentAssessmentPage;
