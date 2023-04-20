import React from 'react';
import AssessmentForm from './AssessmentForm.jsx';
import EnvironmentQuestions from './formData/EnvironmentQuestions.json';

const EnvironmentAssessment = ({ isModal, closeModal }) => {
    const storageName = 'environmentAssessmentProgress';

    const initialFormValues = EnvironmentQuestions.reduce((acc, question) => {
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
        if (score >= 0 && score <= 30) {
            return "Well done! Your exercise routine is optimized to promote your bodily functions and maintain balanced blood sugar and hormone levels. Keep up the good work by exercising regularly.";
        } else if (score >= 31 && score <= 60) {
            return "You are making great progress towards developing a fitness routine that will improve your health. Keep increasing the frequency and duration of your exercise sessions, and you'll be better equipped to manage your weight and balance your hormones.";
        } else if (score >= 61 && score <= 100) {
            return "You have a good foundation for an effective fitness program, but it's important to focus on this area to fully maximize the benefits of movement on your hormones and immune system.";
        } else if (score >= 101) {
            return "It's time to start a fitness program that will help you improve your health, manage your weight, and control your blood sugar levels. By getting started, you can enjoy the benefits of a healthier lifestyle.";
        } else {
            return "Invalid score input. Please enter a score between 0 and 54.";
        }
    };

    const dataTypes = ['pillarAssessments', 'PA', 'environmentAssessments', 'EnA'];

    return (
        <AssessmentForm
            formName="Environment Assessment"
            formType="pillarAssessments"
            mainType="Obstacles and Pillars Assessment"
            initialFormValues={initialFormValues}
            formQuestions={EnvironmentQuestions}
            interpretScore={interpretScore}
            dataTypes={dataTypes}
            storageName={storageName}
            isModal={isModal}
            closeModal={closeModal}
        />
    );
};

export default EnvironmentAssessment;