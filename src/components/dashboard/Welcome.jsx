import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const Welcome = () => {
    const { userData } = useAuth();

    const handleSignOut = () => {
        auth.signOut();
    };

    return (
        <div>
            <h1>Welcome {userData?.firstName}</h1>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Welcome;
