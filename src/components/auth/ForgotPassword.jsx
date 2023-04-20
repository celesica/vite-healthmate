import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../config/firebase';
import { validateEmail } from '../../utils/formValidation';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({ email: '' });

    const validateForm = () => {
        const emailError = validateEmail(email);
        setErrors({ email: emailError });
        return !emailError;
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('We have sent you an email with instructions to reset your password.');
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/user-not-found') {
                setErrors({ email: 'Email is not registered' });
            } else {
                setMessage('Error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="forgot-password">
            <h2 className="text-2xl font-bold text-darkTeal mt-5 mb-3">
                Forgot Password?
            </h2>
            <p className="text-sm text-gray-500">Enter the email address you used when you joined and we'll send you instructions to reset your password.</p>
            <form onSubmit={handleResetPassword} className="forgot-password-form">
                <div className="relative mt-5 mb-5">
                    <input
                        id="email"
                        type="email"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm] text-darkTeal bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-ownTeal peer"
                    />
                    <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-ownTeal peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                </div>
                <button type="submit" className="w-full text-white bg-gradient-to-r from-ownTeal to-ownOrange hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-xl shadow-lg text-sm px-5 py-4 text-center mr-2 mb-3 mt-4">
                    Reset Password
                </button>
            </form>
            {message && (
                <div className="mt-4 text-center">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
