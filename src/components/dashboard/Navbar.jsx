import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from './LoadingScreen';
import { IoIosNotifications, IoMdSettings } from 'react-icons/io';
import LetterAvatar from 'react-lettered-avatar';

const Navbar = () => {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userData) {
            setLoading(false);
        }
    }, [userData]);

    const handleSignOut = () => {
        localStorage.removeItem('userData');
        auth.signOut();
    };

    if (loading) {
        return <LoadingScreen />;
    }

    const initials = userData.firstName[0] + userData.lastName[0];

    const randomColor = () => {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    };


    return (
        <nav className="bg-blue-600 flex justify-between items-center p-4 text-white">
            <div className="flex items-center">
                <img src="/healthmate.png" alt="HealthMate Logo" className="h-8 mr-4" />
                <a href="#" className="mr-4">Dashboard</a>
                <a href="#" className="mr-4">Assessments</a>
                <a href="#" className="mr-4">Analytics</a>
                <a href="#" className="mr-4">Resources</a>
            </div>
            <div className="flex items-center">
                <IoIosNotifications className="mr-4" />
                <IoMdSettings className="mr-4" />
                <LetterAvatar
                    className="mr-20"
                    initials={initials}
                    bgColor={randomColor()}
                    textColor="#ffffff"
                    size={40}
                />
                <span>{`${userData.firstName} ${userData.lastName}`}</span>
                <button onClick={handleSignOut} className="ml-4 bg-white text-blue-600 py-1 px-3 rounded">Sign Out</button>
            </div>
        </nav>
    );
};

export default Navbar;
