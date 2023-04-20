import React from 'react';
import AssessmentForm from './AssessmentForm.jsx';
import SleepQuestions from './formData/SleepQuestions.json';

const SleepAssessment = ({ isModal, closeModal }) => {
    const storageName = 'sleepAssessmentProgress';

    const initialFormValues = SleepQuestions.reduce((acc, question) => {
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
        if (score >= 0 && score <= 9) {
            return "Congratulations! You have excellent sleep habits, which means that your health is not likely to be negatively influenced by lack of quality sleep. Keep up the good work!";
        } else if (score >= 10 && score <= 18) {
            return "Your sleep is not serving you as best it could. It's time to start addressing the areas you can control, such as the time you go to bed and wake up, the presence of electronics in your room, and your eating patterns. Making changes in these areas can help improve the quality of your sleep.";
        } else if (score >= 19 && score <= 28) {
            return "Your poor sleep hygiene is compromising your health, and it's important to address it in order to achieve the balance and energy you desire. You may need to work with a practitioner to determine why you're having trouble sleeping and develop a plan to improve your sleep.";
        } else if (score >= 29 && score <= 54) {
            return "Your sleep is severely compromised and is likely causing imbalances in hormones, blood sugar, inflammatory responses, and digestion. It's crucial to address this issue right away to improve your overall health and well-being. Seeking professional help from a practitioner may be necessary to address your sleep issues effectively.";
        } else {
            return "Invalid score input. Please enter a score between 0 and 54.";
        }
    };


    const dataTypes = ['pillarAssessments', 'PA', 'sleepAssessments', 'SA'];

    return (
        <AssessmentForm
            formName="Sleep Assessment"
            formType="pillarAssessments"
            mainType="Obstacles and Pillars Assessment"
            initialFormValues={initialFormValues}
            formQuestions={SleepQuestions}
            interpretScore={interpretScore}
            dataTypes={dataTypes}
            storageName={storageName}
            isModal={isModal}
            closeModal={closeModal}
        />
    );
};

export default SleepAssessment;