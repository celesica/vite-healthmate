import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../../context/AuthContext';
import { saveFormSubmission, createMainAssessment } from '../../utils/formSubmission';

const AssessmentForm = ({
    formName,
    formType,
    initialFormValues,
    formQuestions,
    interpretScore,
    dataTypes,
    storageName,
    mainType
}) => {
    const { currentUser, userData } = useAuth();
    const [progress, setProgress] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [interpretation, setInterpretation] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const formik = useFormik({
        initialValues:
            JSON.parse(localStorage.getItem(storageName)) || initialFormValues,
        onSubmit: async (values) => {
            const totalScore = Object.values(values).reduce((acc, value) => acc + parseInt(value, 10), 0);
            console.log('Total Score:', totalScore);
            const formStatus = progress === 100 ? 'Completed' : 'In Progress';

            const interpretationText = interpretScore(totalScore);

            setInterpretation(interpretationText);
            setSubmitted(true);

            localStorage.setItem(storageName, JSON.stringify(values));

            if (progress === 100) {
                localStorage.removeItem(storageName);
                const userID = currentUser.uid;
                const submissionDate = new Date();
                const formProgress = progress;
                const formAnswers = Object.entries(values);

                setIsSaved(false);

                await saveFormSubmission(
                    userID,
                    formName,
                    formType,
                    values,
                    interpretationText,
                    formProgress,
                    formQuestions,
                    totalScore,
                    ...dataTypes
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
            } else {
                setIsSaved(true);
            }
        },
    });

    useEffect(() => {
        calculateProgress(formik.values);
    }, [formik.values]);

    const calculateProgress = (values) => {
        const totalQuestions = formQuestions.reduce((acc, question) => {
            if (question.type === 'matrix') {
                return acc + question.rows.length;
            }
            return acc + 1;
        }, 0);

        const answeredQuestions = Object.values(values).filter((v) => v !== '').length;
        setProgress((answeredQuestions / totalQuestions) * 100);
    };

    return (
        <>
            <button
                onClick={() => createMainAssessment(currentUser.uid, ...dataTypes)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Start Assessment
            </button>
            {!submitted ? (
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="text-2xl font-bold">{userData.displayName}</h1>
                    <h2 className="text-lg font-bold">Type: {mainType}</h2>
                    <p className="text-gray-500 mb-4">
                        Date: {new Date().toLocaleString()}
                    </p>
                    {formQuestions.map((question) => (
                        <div key={question.id}>
                            <h3 className="text-lg font-bold">{question.label}</h3>
                            {question.type === 'radio' &&
                                question.options.map((option) => (
                                    <div key={option.score} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            id={`${question.id}-${option.score}`}
                                            name={question.id}
                                            value={option.score}
                                            onChange={formik.handleChange}
                                            checked={formik.values[question.id] === option.score}
                                            className="form-radio h-5 w-5 text-blue-600"
                                        />
                                        <label
                                            htmlFor={`${question.id}-${option.score}`}
                                            className="ml-2 text-gray-700">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            {question.type === 'matrix' && (
                                <table className="w-full border-collapse border border-gray-400 mb-4">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-400 py-2 px-4"></th>
                                        {question.columns.map((column, idx) => (
                                            <th
                                                key={idx}
                                                className="border border-gray-400 py-2 px-4">
                                                {column.label}
                                            </th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {question.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td className="border border-gray-400 py-2 px-4">
                                                {row}
                                            </td>
                                            {question.columns.map((column, colIndex) => (
                                                <td
                                                    key={colIndex}
                                                    className="border border-gray-400 py-2 px-4 text-center">
                                                    <input
                                                        type="radio"
                                                        id={`${question.id}-${rowIndex}-${column.score}`}
                                                        name={`${question.id}-${rowIndex}`}
                                                        value={column.score}
                                                        onChange={formik.handleChange}
                                                        checked={
                                                            formik.values[`${question.id}-${rowIndex}`] ===
                                                            column.score
                                                        }
                                                        className="form-radio h-5 w-5 text-blue-600"
                                                    />
                                                    <label
                                                        htmlFor={`${question.id}-${rowIndex}-${column.score}`}
                                                    ></label>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    ))}
                    <p className="text-gray-500 mb-4">Progress: {progress.toFixed(0)}%</p>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {progress === 100 ? "Submit" : "Save"}
                    </button>
                </form>
            ) : (
                <div>
                    {isSaved ? (
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Your progress has been saved!</h1>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Your results are in!</h1>
                            <p className="text-lg">{interpretation}</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default AssessmentForm;
