import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from './LoadingScreen';
import { IoIosNotifications, IoMdSettings } from 'react-icons/io';
import Avatar from 'react-avatar';

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

    const nameInitials = `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;

    const getRandomColor = () => {
        const colors = ['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8', '#6c757d'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const avatarStyle = {
        marginRight: '2px',
        backgroundColor: getRandomColor(),
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
                <Avatar
                    className="mr-2"
                    name={`${userData.firstName} ${userData.lastName}`}
                    size="32"
                    color="#ffffff"
                    bgColor="#007bff"
                    round={true}
                />
                <span>{`${userData.firstName} ${userData.lastName}`}</span>
                <button onClick={handleSignOut} className="ml-4 bg-white text-blue-600 py-1 px-3 rounded">Sign Out</button>
            </div>
        </nav>
    );
};

export default Navbar;
