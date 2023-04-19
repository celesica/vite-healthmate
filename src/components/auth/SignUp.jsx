import React, { useState } from 'react';
import { auth, googleProvider, addUserToFirestore } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { validateEmail, validatePassword, validateNotEmpty } from '../../utils/formValidation';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const firstNameError = validateNotEmpty(firstName, 'First Name');
        const lastNameError = validateNotEmpty(lastName, 'Last Name');
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        const newErrors = {
            firstName: firstNameError,
            lastName: lastNameError,
            email: emailError,
            password: passwordError,
        };

        setErrors(newErrors);

        return !(firstNameError || lastNameError || emailError || passwordError);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const displayName = `${firstName} ${lastName}`;
            await addUserToFirestore(uid, displayName, email, null);
            await updateProfile(userCredential.user, {
                displayName: displayName,
                photoURL: null,
            });
            setSuccessMessage('You have successfully signed up.');
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="signup">
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSignUp} className="signup-form">
                <div className="flex space-x-4">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>
                </div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full mt-4"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full mt-4"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2 mt-4 w-full"
                >
                    Sign Up
                </button>
                <button onClick={handleGoogleSignIn} className="bg-red-500 text-white rounded px-4 py-2 mt-4 w-full">
                    Sign Up with Google
                </button>
            </form>
        </div>
    );
};

export default SignUp;
