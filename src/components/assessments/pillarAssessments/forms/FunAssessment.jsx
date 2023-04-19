import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../../../../context/AuthContext';
import FunAssessmentData from './FunAssessment.json';
import { saveFormSubmission, createPillarAssessment  } from '../../../../utils/formSubmission';

const FunAssessment = ({ isModal, closeModal }) => {
    const { currentUser, userData } = useAuth();
    const [progress, setProgress] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [interpretation, setInterpretation] = useState('');

    const formik = useFormik({
        initialValues: FunAssessmentData.reduce((acc, question) => {
            if (question.type === 'matrix') {
                question.rows.forEach((_, rowIndex) => {
                    acc[`${question.id}-${rowIndex}`] = '';
                });
            } else {
                acc[question.id] = '';
            }
            return acc;
        }, {}),
        onSubmit: async (values) => {
            const totalScore = Object.values(values).reduce((acc, value) => acc + parseInt(value, 10), 0);
            console.log('Total Score:', totalScore);
            const formStatus = progress === 100 ? 'Completed' : 'In Progress';

            const interpretationText = interpretScore(totalScore);

            setInterpretation(interpretationText);
            setSubmitted(true);

            if (isModal) {
                closeModal();
            }

            const userID = currentUser.uid;
            const submissionDate = new Date();
            const formName = 'Fun Assessment';
            const formType = 'pillarAssessments';
            const formProgress = progress;
            const formQuestions = FunAssessmentData;
            const formAnswers = Object.entries(values);

            await saveFormSubmission(
                userID,
                formName,
                formType,
                values,
                interpretationText,
                formProgress,
                formQuestions,
                totalScore
            );

            console.log('UserID:', userID);
            console.log('Submission Date:', submissionDate);
            console.log('Interpretation:', interpretationText);
            console.log('Form Type:', formType);
            console.log('Form Status:', formStatus);
            console.log('Form Progress:', formProgress);
            console.log('Form Questions:', formQuestions);
            console.log('Form Answers:', formAnswers);
            console.log('Form Score:', totalScore);

        },
    });

    useEffect(() => {
        calculateProgress(formik.values);
    }, [formik.values]);

    const calculateProgress = (values) => {
        const totalQuestions = FunAssessmentData.reduce((acc, question) => {
            if (question.type === 'matrix') {
                return acc + question.rows.length;
            }
            return acc + 1;
        }, 0);

        const answeredQuestions = Object.values(values).filter((v) => v !== '').length;
        setProgress((answeredQuestions / totalQuestions) * 100);
    };

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


    return (
        <>
            <button onClick={() => createPillarAssessment(currentUser.uid)}>Create Pillar Assessment</button>
            {!submitted ? (
                <form onSubmit={formik.handleSubmit}>
                    <h1>{userData.displayName}</h1>
                    <h2>Type: Obstacles and Pillars Assessment</h2>
                    <p>Date: {new Date().toLocaleString()}</p>
                    {FunAssessmentData.map((question) => (
                        <div key={question.id}>
                            <h3>{question.label}</h3>
                            {question.type === 'radio' &&
                                question.options.map((option) => (
                                    <div key={option.score}>
                                        <input
                                            type="radio"
                                            id={`${question.id}-${option.score}`}
                                            name={question.id}
                                            value={option.score}
                                            onChange={formik.handleChange}
                                            checked={formik.values[question.id] === option.score}
                                        />
                                        <label htmlFor={`${question.id}-${option.score}`}>{option.label}</label>
                                    </div>
                                ))}
                            {question.type === 'matrix' && (
                                <table>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        {question.columns.map((column, idx) => (
                                            <th key={idx}>{column.label}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {question.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td>{row}</td>
                                            {question.columns.map((column, colIndex) => (
                                                <td key={colIndex}>
                                                    <input
                                                        type="radio"
                                                        id={`${question.id}-${rowIndex}-${column.score}`}
                                                        name={`${question.id}-${rowIndex}`}
                                                        value={column.score}
                                                        onChange={formik.handleChange}
                                                        checked={formik.values[`${question.id}-${rowIndex}`] === column.score}
                                                    />
                                                    <label htmlFor={`${question.id}-${rowIndex}-${column.score}`}></label>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    ))}
                    <p>Progress: {progress.toFixed(0)}%</p>
                    <button type="submit">{progress === 100 ? 'Submit' : 'Save'}</button>
                </form>
            ) : (
                <div>
                    <h1>Your results are in!</h1>
                    <p>{interpretation}</p>
                </div>
            )}
        </>
    );
};

export default FunAssessment;
