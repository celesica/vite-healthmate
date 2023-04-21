import React, { useState } from 'react';
import SignIn from '../components/auth/SignIn.jsx';
import SignUp from '../components/auth/SignUp.jsx';
import '../assets/styles/AuthPage.css';

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleAuthMode = () => {
        setIsSignIn(!isSignIn);
    };

    const handleToggleClick = (event) => {
        if (event.target.id === "signIn" && !isSignIn) {
            toggleAuthMode();
        } else if (event.target.id === "signUp" && isSignIn) {
            toggleAuthMode();
        }
    };

    return (
        <div className="flex flex-col h-screen md:flex-row bg-left-image authPage">
            <div className="hidden md:block w-2/6 flex items-center justify-center">
            </div>
            <div className="w-full md:w-4/6 flex items-center justify-center">
                <div className={`auth-container bg-white p-8 md:p-12 rounded-2xl w-full max-w-lg shadow-gray-300`}>
                    <img src="/assets/healthmate-main.png" alt="INE HealthMate" className="logo md:h-auto w-auto mx-auto mb-6 md:mb-8" />
                    <div className="mt-3 w-64 toggle-container relative inline-flex items-center rounded-full cursor-pointer text-darkTeal text-sm mb-2 border-mediumTeal border-4 font-medium">
                        <div className={`absolute left-0 top-0 w-1/2 h-full transition-all duration-500 rounded-full ${isSignIn ? 'bg-ownTeal' : 'bg-ownTeal transform translate-x-full'}`}></div>
                        <span id="signIn" onClick={handleToggleClick} className="z-10 px-4 py-2 rounded-l-full w-1/2 text-center cursor-pointer">
                            <span className={`${isSignIn ? 'text-white' : 'text-transition'} pointer-events-none transition-all duration-250`}>Sign In</span>
                        </span>
                        <span id="signUp" onClick={handleToggleClick} className="z-10 px-4 py-2 rounded-r-full w-1/2 text-center cursor-pointer">
                            <span className={`${!isSignIn ? 'text-white' : 'text-transition'} pointer-events-none transition-all duration-250`}>Sign Up</span>
                        </span>
                    </div>
                    <div className={`auth-content`}>
                        {isSignIn ? <SignIn /> : <SignUp />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
