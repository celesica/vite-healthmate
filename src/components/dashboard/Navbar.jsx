import React, { useState, useEffect, useMemo } from 'react';
import { auth, db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from './LoadingScreen';
import { IoIosNotifications, IoMdSettings } from 'react-icons/io';
import LetterAvatar from 'react-lettered-avatar';

const Navbar = () => {
    const { userData, currentUser, isGoogleUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState("");


    useEffect(() => {
        if (currentUser) {
            if (userData || isGoogleUser) {
                setDisplayName(userData?.displayName || currentUser.displayName);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [userData, currentUser, isGoogleUser]);

    const handleSignOut = () => {
        localStorage.removeItem('userData');
        auth.signOut();
    };

    if (loading) {
        return <LoadingScreen />;
    }

    const getInitials = (displayName) => {
        if (!displayName) return "LA";
        return displayName
            .split(' ')
            .map((word) => word[0])
            .join(' ')
            .toUpperCase();
    };

    const initials = getInitials(displayName);
    console.log(initials);

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
                    bgColor={randomColor()}
                    textColor="#ffffff"
                    size={40}
                />
                <span>{userData?.displayName || currentUser.displayName}</span>
                <button onClick={handleSignOut} className="ml-4 bg-white text-blue-600 py-1 px-3 rounded">Sign Out</button>
            </div>
        </nav>
    );
};

export default Navbar;
