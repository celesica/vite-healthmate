import React, {useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { RiDashboardFill } from 'react-icons/ri';
import { MdAssessment } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';
import { BiUser, BiCog, BiLogOut } from "react-icons/bi";
import { BsChatSquareDotsFill } from "react-icons/bs";
import {auth} from "../../config/firebase.js";
// import OnlineNotifications from "../chat/OnlineNotifications.jsx";

const Sidenav = () => {
    const { state: { displayName, initials, randomColor }, dispatch } = useAppContext();

    const handleSignOut = () => {
        localStorage.removeItem('userData');
        auth.signOut();
    };

    return (
        <nav className="flex flex-col justify-between p-4">
            <div className="flex items-center justify-center">
                <img src="/assets/healthmate-main.png" alt="HealthMate Logo" className="h-32 mr-4" />
            </div>
            <div className="w-64 py-4 px-6 mt-5 text-white">
                <ul className="space-y-4">
                    <li>
                        <a href="/dashboard" className="block py-2 px-4 text-superLightTeal hover:bg-ownOrange hover:text-white rounded-lg">
                            <RiDashboardFill className="inline-block mr-2" size={24} />
                            <span className="text-lg">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/profile" className="block py-2 px-4 text-superLightTeal hover:bg-ownOrange hover:text-white rounded-lg">
                            <BiUser className="inline-block mr-2" size={24} />
                            <span className="text-lg">Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="/assessments" className="block py-2 px-4 text-superLightTeal hover:bg-ownOrange hover:text-white rounded-lg">
                            <MdAssessment className="inline-block mr-2" size={24} />
                            <span className="text-lg">Assessments</span>
                        </a>
                    </li>
                    <li>
                        <a href="/analytics" className="block py-2 px-4 text-superLightTeal hover:bg-ownOrange hover:text-white rounded-lg">
                            <IoMdAnalytics className="inline-block mr-2" size={24} />
                            <span className="text-lg">Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a href="/messages" className="block py-2 px-4 text-superLightTeal hover:bg-ownOrange hover:text-white rounded-lg">
                            <BsChatSquareDotsFill className="inline-block mr-2" size={24} />
                            <span className="text-lg">Messages</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={handleSignOut} className="block py-2 px-4 text-superLightTeal hover:bg-ownOrange hover:text-white rounded-lg cursor-pointer">
                            <BiLogOut className="inline-block mr-2" size={24} />
                            <span className="text-lg">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex-1"></div>
        </nav>

    );
};

export default Sidenav;
