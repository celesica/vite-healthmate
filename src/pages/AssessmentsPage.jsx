import React from 'react';
import Sidenav from '../components/dashboard/Sidenav';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import {IoInformationCircle} from "react-icons/io5";
import { Link } from 'react-router-dom';

const AssessmentsPage = () => {

    return (
        <div className="flex h-screen p-5">
            <div className="navbar w-1/5 bg-darkTeal flex-shrink-0 min-h-full z-10 p-4 rounded-lg shadow-lg">
                <Sidenav />
            </div>
            <div className="main w-4/5 ml-auto py-4 px-8">
                <DashboardHeader title="Take Charge of Your Health!" />
                <div className="p-4 mb-4 text-lg text-darkTeal rounded-lg bg-superLightTeal dark:bg-gray-800 dark:text-blue-400 border-t-4 border-ownTeal flex items-start" role="alert">
                    <div className="flex-none">
                        <IoInformationCircle className="text-3xl text-ownTeal" />
                    </div>
                    <div className="flex-grow pl-4">
                        <p className="font-bold">This page contains a collection of all the evaluation and assessment forms</p>
                    </div>
                </div>
                <div className="m-10 border border-lightTeal rounded-2xl p-5">
                    <h2 className="font-bold text-xl mb-2">Obstacles and Pillars Assessments and Scorecards</h2>
                    <p className="text-lg mb-4">Identify what’s been keeping you from getting from where you are to where you want to be at a pace you enjoy!</p>
                    <div className="flex flex-wrap">
                        <div className="w-full sm:w-1/2 md:w-1/4 p-3">
                            <div className="bg-white rounded-lg shadow-lg h-full">
                                <div className="p-5 text-center">
                                    <h2 className="text-xl font-bold mb-2 text-darkTeal">Fun Assessment</h2>
                                    <p className="text-medium text-gray-500">Enjoyment is the cornerstone to achieving vibrant health, and it’s a pillar that is frequently overlooked.</p>
                                </div>
                                <div className="px-5 text-center">
                                    <Link className="w-full bg-darkTeal text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal" to={`/test?assessmentType=fun`}>
                                        <button className="m-4">Take the Assessment</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/4 p-3">
                            <div className="bg-white rounded-lg shadow-lg h-full text-darkTeal">
                                <div className="p-5 text-center">
                                    <h2 className="text-xl font-bold mb-2">Sleep Assessment</h2>
                                    <p className="text-medium text-gray-500">One of the best ways to improve your health is to “sleep on it”. Restful and restorative sleep is integral to healing and rejuvenation processes.</p>
                                    <Link className="w-full bg-darkTeal text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal" to={`/test?assessmentType=sleep`}>
                                        <button className="m-4">Take the Assessment</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/4 p-3">
                            <div className="bg-white rounded-lg shadow-lg h-full text-darkTeal">
                                <div className="p-5 text-center">
                                    <h2 className="text-xl font-bold mb-2">Exercise Assessment</h2>
                                    <p className="text-medium text-gray-500">Create a customized fitness plan that is easy, energizing, fun, AND fits into your busy life. </p>
                                    <Link className="w-full bg-darkTeal text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal" to={`/test?assessmentType=sleep`}>
                                        <button className="m-4">Take the Assessment</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/4 p-3">
                            <div className="bg-white rounded-lg shadow-lg h-full text-darkTeal">
                                <div className="p-5 text-center">
                                    <h2 className="text-xl font-bold mb-2">Sleep Assessment</h2>
                                    <p className="text-medium text-gray-500">One of the best ways to improve your health is to “sleep on it”. Restful and restorative sleep is integral to healing and rejuvenation processes.</p>
                                    <Link className="w-full bg-darkTeal text-white font-bold px-4 py-2 rounded-lg hover:bg-ownTeal" to={`/test?assessmentType=sleep`}>
                                        <button className="m-4">Take the Assessment</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentsPage;
