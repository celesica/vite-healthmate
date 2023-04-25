import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import '../../assets/styles/Assessments.css';
import AssessmentScoreChart from "../../components/analytics/Charts/AssessmentScoreChart";
import { useChartDataContext} from "../../context/ChartDataContext";

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
    const { createMainAssessment, saveFormSubmission } = useAppContext();
    const [progress, setProgress] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [interpretation, setInterpretation] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const { state: hasChartData, loading } = useChartDataContext();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (hasChartData) {
            setIsDataLoaded(true);
        }
    }, [hasChartData]);

    const formik = useFormik({
        initialValues:
            JSON.parse(localStorage.getItem(storageName)) || initialFormValues,
        onSubmit: async (values) => {
            const testScore = Object.values(values).reduce((acc, value) => acc + parseInt(value, 10), 0);
            console.log('Total Score:', testScore);

            // Calculate healthScore based on testScore and set value for each assessment
            let healthScore = 0;

            if (formName === "Fun Assessment") {
                const funSet = 48;
                healthScore = Math.round((testScore / funSet) * 100);
            } else if (formName === "Sleep Assessment") {
                const sleepSet = 51;
                healthScore = Math.round((testScore / sleepSet) * 100);
            } else if (formName === "Exercise Assessment") {
                const exerciseSet = 21;
                healthScore = Math.round((testScore / exerciseSet) * 100);
            } else if (formName === "Environment Assessment") {
                const environmentSet = 249;
                healthScore = Math.round((testScore / environmentSet) * 100);
            } else if (formName === "Diet Assessment") {
                const dietSet = 126;
                healthScore = Math.round((testScore / dietSet) * 100);
            }

            console.log('Health Score:', healthScore);

            const formStatus = progress === 100 ? 'Completed' : 'In Progress';

            const interpretationText = interpretScore(testScore);

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
                    healthScore,
                    ...dataTypes
                );

                setIsDataLoaded(false);


                console.log('UserID:', userID);
                console.log('Submission Date:', submissionDate);
                console.log('Interpretation:', interpretationText);
                console.log('Form Type:', formType);
                console.log('Form Status:', formStatus);
                console.log('Form Progress:', formProgress);
                console.log('Form Questions:', formQuestions);
                console.log('Form Answers:', formAnswers);
                console.log('Form Score:', healthScore);
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
            <div className="w-full p-4 border border-gray-200 bg-gray-50 rounded-t-xl dark:border-gray-600 dark:bg-gray-700">
                <div className="w-full h-4 bg-gray-300 rounded-full dark:bg-gray-800">
                    <div
                        className="h-4 bg-ownTeal rounded-full dark:bg-blue-500"
                        style={{ width: `${progress.toFixed(0)}%` }}
                    >
                        <p className="text-white text-xs pl-4 text-gray-100">Progress: {progress.toFixed(0)}%</p>
                    </div>
                </div>
            </div>
            <div className="p-12 pb-8 flex p-0 bg-white border-gray-200 bg-gradient-to-r code-preview border-x">
                {!submitted ? (
                    <form className="w-full" onSubmit={formik.handleSubmit}>
                        <h1 className="text-xl font-bold mb-2">{userData.displayName}</h1>
                        <p className="text-gray-500 mb-4">
                            Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                        </p>
                        <h2 className="text-2xl font-bold text-darkTeal">{formName}</h2>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className="overflow-auto p-6 pt-0 custom-scrollbar" style={{ maxHeight: "calc(48vh)" }}>
                            {formQuestions.map((question) => (
                                <div key={question.id}>
                                    <h3 className="text-lg font-bold text-gray-700 mt-5 mb-2">{question.label}</h3>
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
                                                    className="form-radio h-5 w-5 text-ownTeal"
                                                />
                                                <label
                                                    htmlFor={`${question.id}-${option.score}`}
                                                    className="ml-2 text-gray-700">
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    {question.type === 'matrix' && (
                                        <table className="mt-3 w-full border-collapse border border-gray-300 mb-4 rounded-t-lg">
                                            <thead className="bg-gray-100">
                                            <tr>
                                                <th className="border border-gray-300 py-2 px-4"></th>
                                                {question.columns.map((column, idx) => (
                                                    <th
                                                        key={idx}
                                                        className="border border-gray-300 py-2 px-4 text-darkTeal">
                                                        {column.label}
                                                    </th>
                                                ))}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {question.rows.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td className="border border-gray-300 py-2 px-4 text-gray-600">
                                                        {row}
                                                    </td>
                                                    {question.columns.map((column, colIndex) => (
                                                        <td
                                                            key={colIndex}
                                                            className="border border-gray-300 py-2 px-4 text-center text-gray-500">
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
                                                                className="form-radio h-5 w-5 text-ownTeal"
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
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="rounded-xl w-full text-white bg-gradient-to-r from-ownTeal to-ownOrange hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium shadow-lg uppercase text-xl px-5 py-4 text-center">
                                {progress === 100 ? "Submit" : "Save"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        {isSaved ? (
                            <div className="text-center">
                            <h1 className="text-2xl font-bold">Your progress has been saved!</h1>
                            </div>
                            ) : (
                            <div className="text-center">
                                <h1 className="text-2xl font-bold text-ownOrange">Your results are in!</h1>
                                <p className="m-2 text-lg p-4 bg-gray-100 border border-gray-200">{interpretation}</p>
                                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                <h2 className="font-bold text-ownTeal text-xl">Your Trend So Far</h2>
                                <AssessmentScoreChart assessmentName={formName?.split(' ')[0]} />
                                <button className="w-full bg-ownTeal text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal">
                                    <Link to="/assessments">Back to Assessments</Link>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="h-16 p-5text-sm font-medium text-gray-900 bg-gray-100 border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
            </div>
        </>
    );
};

export default AssessmentForm;
