import React, { useState } from 'react';
import AssessmentButton from '../../assessments/AssessmentButton';

const NoData = ({ onButtonClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleButtonClick = () => {
        onButtonClick();
        setIsModalOpen(true);
    };
    const Modal = ({ isOpen, closeModal }) => {
        if (!isOpen) {
            return null;
        }

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg z-20" style={{ width: '40rem', height: 'auto' }}>
                    <h2 className="text-2xl font-bold mb-4 text-darkTeal">Obstacles and Pillars Assessments</h2>
                    <p className="">Identify what’s been keeping you from getting from where you are to where you want to be at a pace you enjoy! Pick any of the assessments to start.</p>
                    <div className="flex flex-col gap-2 justify-center mt-4">
                        <div className="mb-2">
                            <button
                                className="w-40 bg-darkTeal text-white font-bold text-base px-4 py-2 rounded-lg hover:bg-ownTeal mr-4">Fun
                            </button>
                            <button
                                className="w-40 bg-darkTeal text-white font-bold text-base px-4 py-2 rounded-lg hover:bg-ownTeal mr-4">Sleep
                            </button>
                            <button
                                className="w-40 bg-darkTeal text-white font-bold text-base px-4 py-2 rounded-lg hover:bg-ownTeal mr-4">Exercise
                            </button>
                        </div>
                        <div>
                            <button
                                className="w-40 bg-darkTeal text-white font-bold text-base px-4 py-2 rounded-lg hover:bg-ownTeal mr-4">Environment
                            </button>
                            <button
                                className="w-40 bg-darkTeal text-white font-bold text-base px-4 py-2 rounded-lg hover:bg-ownTeal mr-4">Fun
                            </button>
                        </div>
                    </div>
                    <button
                        className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-lg"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-full text-center absolute">
                <p className="font-medium text-2xl text-darkTeal">You haven't taken any Pillar Assessments yet.</p>
                <AssessmentButton onClick={handleButtonClick} className="mt-4 bg-darkTeal text-white font-bold text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl px-4 py-2 rounded-lg hover:bg-ownTeal mr-4">
                    Take the test now
                </AssessmentButton>
            </div>
            <Modal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default NoData;
