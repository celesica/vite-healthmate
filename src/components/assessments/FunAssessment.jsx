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
            return "It's time to prioritize fun in your life. Your low score indicates that you may be missing out on the many benefits of leisure activities, so try to plan for at least 5 minutes of fun each day to start. As you begin to experience the positive effects of fun on your energy and health, you can gradually increase the time you devote to leisure activities.";
        } else if (score >= 30 && score <= 40) {
            return "While you have some fun in your life, your score suggests that you could benefit from making fun a more consistent part of your routine. Start by setting aside 5-10 minutes each day for fun activities, and aim for at least 30 minutes on weekends.";
        } else if (score >= 20 && score < 30) {
            return "It's time to start prioritizing fun in your life. Your score suggests that you may be experiencing a fun deficit, so try to add more leisure activities to your daily routine and plan some bigger events to look forward to.";
        } else if (score >= 10 && score < 20) {
            return "Good news, you're on the right track but could benefit from adding more fun to your daily routine. Try to set aside 20-30 minutes each day for fun activities, and aim for a couple of hours each week for more substantial leisure activities.";
        } else {
            return "Congratulations, you're doing an excellent job of having fun! Your high score indicates that you're likely enjoying life to the fullest and reaping the benefits of increased energy and happiness.";
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