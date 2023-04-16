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
            <h2>Forgot Password?</h2>
            <p>Enter the email address you used when you joined and we'll send you instructions to reset your password.</p>
            <form onSubmit={handleResetPassword} className="forgot-password-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2 mt-4 w-full"
                >
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
