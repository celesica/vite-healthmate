import React, { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`
            });
            setSuccessMessage('You have successfully signed up. Please sign in.');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="signup">
            {successMessage && <p>{successMessage}</p>}
            <form onSubmit={handleSignUp} className="signup-form">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full mt-4"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full mt-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full mt-4"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2 mt-4 w-full"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
