import React, { useState } from 'react';
import SignIn from '../components/auth/SignIn.jsx';
import SignUp from '../components/auth/SignUp.jsx';

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleAuthMode = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className="auth-page min-h-screen flex items-center justify-center">
            <div className="auth-container bg-white p-8 rounded shadow-lg w-full max-w-md">
                <div className="auth-header flex justify-between">
                    <button
                        onClick={toggleAuthMode}
                        className={`px-4 py-2 rounded ${
                            isSignIn ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                        }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={toggleAuthMode}
                        className={`px-4 py-2 rounded ${
                            !isSignIn ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="auth-content mt-8">
                    {isSignIn ? <SignIn /> : <SignUp />}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
