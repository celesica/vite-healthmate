import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { IconContext } from 'react-icons';
import { useAppContext } from '../../context/AppContext';
import { IoMdSettings } from 'react-icons/io';
import LetterAvatar from 'react-lettered-avatar';
// import MessageNotifications from '../chat/MessageNotifications';

const DashboardHeader = ({ title }) => {
    const {
        state: { displayName, initials, randomColor },
        dispatch,
    } = useAppContext();

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-bold text-ownOrange">{title}</div>
            <div className="flex items-center">
                <IconContext.Provider value={{ className: 'mr-4 text-3xl text-ownTeal' }}>
                    <Link to="/settings">
                        <IoMdSettings />
                    </Link>
                </IconContext.Provider>
                <IconContext.Provider value={{ className: 'mr-4 text-3xl text-ownTeal' }}>
                    <Link to="/messages">
                        {/*<MessageNotifications />*/}
                    </Link>
                </IconContext.Provider>
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
