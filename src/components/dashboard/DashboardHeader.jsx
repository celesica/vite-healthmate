import React from 'react';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { IoIosNotifications, IoMdSettings } from 'react-icons/io';
import LetterAvatar from 'react-lettered-avatar';

const DashboardHeader = ({title}) => {
    // const { userData, currentUser, isGoogleUser } = useAuth();
    const { state: { displayName, initials, randomColor }, dispatch } = useAppContext();

    const handleSignOut = () => {
        localStorage.removeItem('userData');
        auth.signOut();
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-bold text-ownOrange">{title}</div>
            <div className="flex items-center">
                <IoMdSettings className="mr-4 mr-4 text-3xl text-ownTeal flex rounded-full focus:outline-none" />
                <IoIosNotifications className="mr-4 mr-4 text-3xl text-ownTeal" />
                <LetterAvatar
                    className="mr-20"
                    name={initials}
                    bgColor={randomColor}
                    textColor="#ffffff"
                    size={45}
                />
                <span className="ml-4">{displayName}</span>
                <button onClick={handleSignOut} className="bg-white text-blue-600 py-1 px-3 rounded mr-4">Sign Out</button>
            </div>
        </div>
    );
};

export default DashboardHeader;
