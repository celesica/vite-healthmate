import React, { useState } from 'react';
import AssessmentButton from '../../assessments/AssessmentButton';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useAppContext} from "../../../context/AppContext.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";


const NoData = () => {
    const navigate = useNavigate();
    const { createMainAssessment } = useAppContext();
    const { currentUser } = useAuth();

    const handleAssessmentButtonClick = () => {
        const userID = currentUser.uid;
        const pillarAssessments = 'pillarAssessments';
        const PA = 'PA';

        createMainAssessment(userID, pillarAssessments, PA);
        navigate('/assessments');
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-full text-center">
                <p className="font-medium text-2xl text-darkTeal">You haven't taken any Pillar Assessments yet.</p>

                    <AssessmentButton className="mt-4 bg-darkTeal text-white font-bold text-base sm:text-xs md:text-sm lg:text-lg xl:text-xl px-4 py-2 rounded-lg hover:bg-ownTeal mr-4"
                                      onClick={handleAssessmentButtonClick}>
                        Take the test now
                    </AssessmentButton>
                    {/*<Navigate to="/assessments" />*/}

            </div>
        </>
    );
};

export default NoData;
