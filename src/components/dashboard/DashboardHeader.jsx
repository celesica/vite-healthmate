import React from 'react';
import { auth } from '../../config/firebase';
import { useAppContext } from '../../context/AppContext';
import { IoIosNotifications, IoMdSettings } from 'react-icons/io';
import LetterAvatar from 'react-lettered-avatar';

const DashboardHeader = ({title}) => {
    // const { userData, currentUser, isGoogleUser } = useAuth();
    const { state: { displayName, initials, randomColor }, dispatch } = useAppContext();

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
            </div>
        </div>
    );
};

export default DashboardHeader;
