import React, { useState } from 'react';
import { useChartDataContext } from '../../../context/ChartDataContext';
import { FaRegCalendarAlt } from 'react-icons/fa';

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

const FunScoreCard = () => {
    const [showModal, setShowModal] = useState(false);
    const { state } = useChartDataContext();

    const funAssessments = state.chartData.funAssessments;
    const sortedAssessments = funAssessments.sort(
        (a, b) => b.submissionDate.toDate() - a.submissionDate.toDate()
    );
    const latestAssessment = sortedAssessments[0];
    const bgColor = getBgColor(latestAssessment?.formScore);
    const { label: badgeLabel, badgeColor } = getBadgeInfo(latestAssessment?.formScore);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(latestAssessment?.submissionDate.toDate());

    return (
        <>
            <div
                className={`rounded-lg px-6 py-4 hover:cursor-pointer text-darkTeal shadow-xl`}
                onClick={handleModalOpen}
                style={{backgroundColor: bgColor}}
            >
                <div className="mb-2">
                    <h2 className="text-xl font-bold">Fun Assessment</h2>
                    <p className="text-sm">
                        <FaRegCalendarAlt className="inline" /> {formattedDate}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-bold text-4xl">
                        {latestAssessment?.formScore}
                    </p>
                    <span style={{backgroundColor: badgeColor}} className="ml-2 inline-flex items-center justify-center h-6 px-2 text-xs font-medium text-white rounded">
                        {badgeLabel}
                    </span>
                </div>
                <div className="text-xs text-center text-red-400">Click to View Analysis</div>
            </div>
            {showModal && (
                <>
                    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700 opacity-50 z-10"></div>
                    <div className="text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-20" style={{ width: '40rem', height: '25rem' }}>
                        <div className="flex justify-end">
                            <button
                                className="text-gray-600 hover:text-gray-800"
                                onClick={handleModalClose}
                            >
                                <svg
                                    className="h-6 w-6 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59l-4.88-4.88a1 1 0 0 0-1.42 1.42L10.59 12l-4.88 4.88a1 1 0 0 0 1.42 1.42L12 13.41l4.88 4.88a1 1 0 0 0 1.42-1.42L13.41 12l4.88-4.88a1 1 0 0 0 0-1.41z" />
                                </svg>
                            </button>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-ownOrange">Fun Assessment</h2>
                        <p className="mb-4">
                            Last taken on {' '}
                            {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(latestAssessment?.submissionDate.toDate())}
                        </p>
                        <p
                            className="text-lg m-4 p-4 border-gray-300 border-2 rounded-3xl"
                            style={{
                                backgroundColor: bgColor,
                                filter: "brightness(90%)",
                            }}
                        >
                            {latestAssessment?.interpretation}
                        </p>

                        <div className="flex justify-center mt-6 mx-12">
                                <button className="w-full bg-darkTeal text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal mr-4">
                                    Retake Assessment
                                </button>
                                <button className="w-full bg-ownYellow text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal">
                                    Check Your Trend
                                </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default FunScoreCard;
