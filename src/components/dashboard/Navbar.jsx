import React from 'react';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import LoadingScreen from './LoadingScreen';
import { IoIosNotifications, IoMdSettings } from 'react-icons/io';
import LetterAvatar from 'react-lettered-avatar';

const Navbar = () => {
    const { userData, currentUser, isGoogleUser } = useAuth();
    const { state: { displayName, initials, randomColor }, dispatch } = useAppContext();

    const handleSignOut = () => {
        localStorage.removeItem('userData');
        auth.signOut();
    };

    if (!displayName) {
        return <LoadingScreen />;
    }

    return (
        <nav className="bg-blue-600 flex justify-between items-center p-4 text-white">
            <div className="flex items-center">
                <img src="/healthmate.png" alt="HealthMate Logo" className="h-8 mr-4" />
                <a href="/dashboard" className="mr-4">Dashboard</a>
                <a href="/assessments" className="mr-4">Assessments</a>
                <a href="#" className="mr-4">Analytics</a>
                <a href="#" className="mr-4">Resources</a>
            </div>
            <div className="flex items-center">
                <IoIosNotifications className="mr-4" />
                <IoMdSettings className="mr-4" />
                <LetterAvatar
                    className="mr-20"
                    name={initials}
                    bgColor={randomColor}
                    textColor="#ffffff"
                    size={40}
                />
                <span>{displayName}</span>
                <button onClick={handleSignOut} className="ml-4 bg-white text-blue-600 py-1 px-3 rounded">Sign Out</button>
            </div>
        </nav>
    );
};

export default Navbar;
