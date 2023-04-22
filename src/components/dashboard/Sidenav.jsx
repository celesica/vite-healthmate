import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { RiDashboardFill } from 'react-icons/ri';
import { MdAssessment } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';
import { GoFileSubmodule } from 'react-icons/go';

const Sidenav = () => {
    const { userData } = useAuth();

    return (
        <nav className="flex flex-col justify-between p-4 text-white">
            <div className="flex items-center justify-center">
                <img src="/assets/healthmate.png" alt="HealthMate Logo" className="h-20 mr-4" />
            </div>
            <div className="flex flex-col items-baseline justify-start">
                <a href="/dashboard" className="my-2 flex items-center">
                    <RiDashboardFill className="mr-2" />
                    Dashboard
                </a>
                <a href="/assessments" className="my-2 flex items-center">
                    <MdAssessment className="mr-2" />
                    Assessments
                </a>
                <a href="#" className="my-2 flex items-center">
                    <IoMdAnalytics className="mr-2" />
                    Analytics
                </a>
                <a href="#" className="my-2 flex items-center">
                    <GoFileSubmodule className="mr-2" />
                    Resources
                </a>
            </div>
        </nav>
    );
};

export default Sidenav;
