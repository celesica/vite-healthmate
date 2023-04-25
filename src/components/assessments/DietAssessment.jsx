import React from 'react';
import AssessmentForm from './AssessmentForm.jsx';
import DietQuestions from './formData/DietQuestions.json';

const DietAssessment = ({ isModal, closeModal }) => {
    const storageName = 'dietAssessmentProgress';

    const initialFormValues = DietQuestions.reduce((acc, question) => {
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
        if (score >= 60) {
            return "Your diet is severely compromised and needs a complete overhaul. The foods you are consuming may be negatively impacting your body in obvious or subtle ways. It may be helpful to identify and gradually eliminate a few foods in this section. If your health is significantly compromised, it may be best to make changes quickly, but at a pace that you can sustain in the long run.";
        } else if (score >= 31 && score <= 59) {
            return "Your current diet is not serving your body well, and several dietary stressors may be contributing to issues such as low energy, hormone imbalances, and digestive disturbances. Gradually eliminating these stressors and replacing them with healthier options can have a significant impact on your health. It is essential to work at a pace that you can sustain and not wait for severe symptoms to make changes.";
        } else if (score >= 11 && score <= 30) {
            return "Your current diet is not fully supporting your overall well-being, and there are several areas of improvement. It may be helpful to identify and eliminate any dietary stressors gradually to ensure long-term adherence. Taking small steps to reduce or eliminate unhealthy foods can significantly improve your health in the long run.";
        } else {
            return "Congratulations! You have very few diet stressors, which means you are making healthy food choices with minimal negative impact on your body. However, if you still experience symptoms despite your good habits, it may be helpful to reevaluate your food choices and eliminate any potential triggers. Additionally, you can consider increasing your consumption of foods that are beneficial to your health.";
        }
    };

    const dataTypes = ['pillarAssessments', 'PA', 'dietAssessments', 'DA'];

    return (
        <AssessmentForm
            formName="Diet Assessment"
            formType="pillarAssessments"
            mainType="Obstacles and Pillars Assessment"
            initialFormValues={initialFormValues}
            formQuestions={DietQuestions}
            interpretScore={interpretScore}
            dataTypes={dataTypes}
            storageName={storageName}
            isModal={isModal}
            closeModal={closeModal}
        />
    );
};

export default DietAssessment;