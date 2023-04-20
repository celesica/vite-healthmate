import React, { useState } from 'react';
import SignIn from '../components/auth/SignIn.jsx';
import SignUp from '../components/auth/SignUp.jsx';
import '../assets/styles/AuthPage.css';

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleAuthMode = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className="flex h-screen">
            <div className="w-2/5 flex items-center justify-center bg-ownTeal">
                <h1 className="text-4xl font-bold text-white">INE HealthMate</h1>
            </div>
            <div className="w-3/5 flex items-center justify-center">
                <div className={`auth-container bg-white p-10 rounded-2xl  w-full max-w-lg shadow-gray-300`}>
                    <div className={`auth-content`}>
                        {isSignIn ? <SignIn /> : <SignUp />}
                    </div>
                    <div className="auth-actions flex justify-center mt-4 fixed top-5 right-10 text-sm text-gray-500">
                        <span className="mr-2">
                            {isSignIn ? 'Don\'t have an account?' : 'Already have an account?'}
                        </span>
                        <button
                            onClick={toggleAuthMode}
                            className="text-ownTeal"
                        >
                            {isSignIn ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
