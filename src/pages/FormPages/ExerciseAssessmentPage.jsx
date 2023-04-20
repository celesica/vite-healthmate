import React from 'react';
import ExerciseAssessment from '../../components/assessments/ExerciseAssessment.jsx';

const ExerciseAssessmentPage = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Exercise Assessment</h1>
            <ExerciseAssessment />
        </div>
    );
};

export default ExerciseAssessmentPage;
