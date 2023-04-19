import React from 'react';
import AssessmentForm from './AssessmentForm.jsx';
import FunAssessmentData from './formData/FunAssessment.json';

const FunAssessment = ({ isModal, closeModal }) => {
    const storageName = 'funAssessmentProgress';

    const initialFormValues = FunAssessmentData.reduce((acc, question) => {
        if (question.type === 'matrix') {
            question.rows.forEach((_, rowIndex) => {
                acc[`${question.id}-${rowIndex}`] = '';
            });
        } else {
            acc[question.id] = '';
        }
        return acc;
    }, {});

    const interpretScore = (score) => {
        if (score > 40) {
            return "Congratulations, you're doing an excellent job of having fun! ...";
        } else if (score >= 30 && score <= 40) {
            return "Good news, you're on the right track but could benefit from ...";
        } else if (score >= 20 && score < 30) {
            return "It's time to start prioritizing fun in your life. ...";
        } else if (score >= 10 && score < 20) {
            return "While you have some fun in your life, ...";
        } else {
            return "It's time to prioritize fun in your life. ...";
        }
    };

    const dataTypes = ['pillarAssessments', 'PA', 'funAssessments', 'FA'];

    return (
        <AssessmentForm
            formName="Fun Assessment"
            formType="pillarAssessments"
            mainType="Obstacles and Pillars Assessment"
            initialFormValues={initialFormValues}
            formQuestions={FunAssessmentData}
            interpretScore={interpretScore}
            dataTypes={dataTypes}
            storageName={storageName}
            isModal={isModal}
            closeModal={closeModal}
        />
    );
};

export default FunAssessment;