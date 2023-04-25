import React from 'react';
import Sidenav from '../components/dashboard/Sidenav';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import {IoInformationCircle} from "react-icons/io5";
// import PrivateChat from "../components/chat/PrivateChat.jsx";
// import MembersOnline from "../components/chat/MembersOnline.jsx";

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
                        <p className="font-bold">Let's build a happy and healthy community!</p>
                    </div>
                </div>
                <div className="m-10 border border-lightTeal rounded-2xl p-5">
                    {/*<PrivateChat />*/}
                    {/*<MembersOnline />*/}
                </div>
            </div>
        </div>
    );
};

export default AssessmentsPage;
