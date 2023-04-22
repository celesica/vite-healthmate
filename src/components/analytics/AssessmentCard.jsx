import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChartDataContext } from '../../context/ChartDataContext.jsx';
import { FaRegCalendarAlt } from 'react-icons/fa';
import AssessmentScoreChart from "./Charts/AssessmentScoreChart.jsx";

const getBgColor = (formScore) => {
    if (formScore >= 0 && formScore <= 10) {
        return '#E4EFE7';
    } else if (formScore >= 11 && formScore <= 20) {
        return '#ECF9FF';
    } else if (formScore >= 21 && formScore <= 35) {
        return '#FFF9DE';
    } else if (formScore >= 36 && formScore <= 50) {
        return '#FFE3B0';
    } else {
        return '#FAD4D4';
    }
};

const getBadgeInfo = (formScore) => {
    if (formScore >= 0 && formScore <= 10) {
        return { label: 'Overall good balance', badgeColor: '#1F8A70' };
    } else if (formScore >= 11 && formScore <= 20) {
        return { label: 'In need of tune up', badgeColor: '#6DA9E4' };
    } else if (formScore >= 21 && formScore <= 35) {
        return { label: 'Things are out of balance', badgeColor: '#F7DB6A' };
    } else if (formScore >= 36 && formScore <= 50) {
        return { label: 'Very compromised', badgeColor: '#FDA769' };
    } else {
        return { label: 'Severely compromised', badgeColor: '#FF6464' };
    }
};

const AssessmentCard = ({ assessmentName }) => {
    const [showModal, setShowModal] = useState(false);
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const { state, hasChartData } = useChartDataContext();

    const assessments = state.chartData[`${assessmentName.toLowerCase()}Assessments`];
    const sortedAssessments = assessments.sort(
        (a, b) => b.submissionDate.toDate() - a.submissionDate.toDate()
    );
    const latestAssessment = sortedAssessments[0];
    const bgColor = hasChartData ? getBgColor(latestAssessment?.formScore) : '#d1cece'
    const { label: badgeLabel, badgeColor } = getBadgeInfo(latestAssessment?.formScore);

    const handleModalOpen = () => {
        if (hasChartData) {
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(latestAssessment?.submissionDate.toDate());

    const handleCardFlip = () => {
        setIsCardFlipped(!isCardFlipped);
    };

    const CardFront = () => {
        return (
            <div>
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold mb-2 text-ownOrange">{assessmentName} Assessment</h2>
                        <p className="text-lg text-gray-500 mb-4">
                            Last taken on {' '}
                            {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(latestAssessment?.submissionDate.toDate())}
                        </p>
                    </div>
                    <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-lightTeal hover:text-darkTeal rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal"
                            onClick={handleModalClose}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <p className="text-lg m-4 p-4 border-gray-300 border-2 rounded-3xl" style={{backgroundColor: bgColor}}>
                        {latestAssessment?.interpretation}
                    </p>
                </div>
                <div className="space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <div className="flex justify-center mt-6 mx-12 mb-6">
                        <Link className="w-full bg-darkTeal text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal mr-4" to={`/test?assessmentType=${assessmentName.toLowerCase()}`}>
                            <button >Retake Assessment</button>
                        </Link>
                        <button className="w-full bg-ownYellow text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal" onClick={handleCardFlip}>
                            Check Your Trend
                        </button>
                    </div>
                </div>
            </div>
        )
    };

    const CardBack = () => {
        return (
            <div>
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <div className="flex flex-col text-left">
                        <h2 className="text-3xl font-bold mb-2 text-ownOrange">{assessmentName} Assessment</h2>
                        <p className="text-lg text-gray-500 mb-4">
                            As of {' '}
                            {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(latestAssessment?.submissionDate.toDate())}
                        </p>
                    </div>
                    <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-lightTeal hover:text-darkTeal rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal"
                            onClick={handleModalClose}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <AssessmentScoreChart assessmentName={assessmentName} />
                    </div>
                </div>
                <div className="space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <div className="flex justify-center mt-6 mx-12 mb-6">
                        <Link className="w-full bg-darkTeal text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal mr-4" to={`/test?assessmentType=${assessmentName.toLowerCase()}`}>
                            <button >Retake Assessment</button>
                        </Link>
                        <button className="w-full bg-ownYellow text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal" onClick={handleCardFlip}>
                            Flip Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div
                className={`rounded-lg px-6 py-4 hover:cursor-pointer text-darkTeal shadow-xl`}
                onClick={handleModalOpen}
                style={{backgroundColor: bgColor}}
            >
                <div className="mb-2">
                    <h2 className="text-xl font-bold">{assessmentName} Assessment</h2>
                    {hasChartData && (
                        <p className="text-sm">
                            <FaRegCalendarAlt className="inline" /> {formattedDate}
                        </p>
                    )}
                </div>
                {hasChartData ? (
                    <>
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-4xl">
                                {latestAssessment.formScore}
                            </p>
                            <span style={{backgroundColor: badgeColor}} className="ml-2 inline-flex items-center justify-center h-6 px-2 text-xs font-medium text-white rounded">
                                {badgeLabel}
                            </span>
                        </div>
                        <div className="text-xs text-center text-red-400">Click to View Analysis</div>
                    </>
                ) : (
                    <div className="text-center text-gray-600">You haven't taken this test yet.</div>
                )}
            </div>
            {showModal && (
                <>
                    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700 opacity-50 z-10"></div>
                    <div className="flex flex-col justify-center text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-20 " style={{ width: '40rem', }}>
                        {/*<div className="flex justify-end">*/}
                        {/*    <button*/}
                        {/*        className="text-gray-600 hover:text-gray-800"*/}
                        {/*        onClick={handleModalClose}*/}
                        {/*    >*/}
                        {/*        <svg*/}
                        {/*            className="h-6 w-6 fill-current"*/}
                        {/*            xmlns="http://www.w3.org/2000/svg"*/}
                        {/*            viewBox="0 0 24 24"*/}
                        {/*        >*/}
                        {/*            <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59l-4.88-4.88a1 1 0 0 0-1.42 1.42L10.59 12l-4.88 4.88a1 1 0 0 0 1.42 1.42L12 13.41l4.88 4.88a1 1 0 0 0 1.42-1.42L13.41 12l4.88-4.88a1 1 0 0 0 0-1.41z" />*/}
                        {/*        </svg>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                            {isCardFlipped ? <CardBack /> : <CardFront />}
                    </div>
                </>
            )}
        </>
    );
};

export default AssessmentCard;
