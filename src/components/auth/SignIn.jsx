import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../config/firebase';
import ForgotPassword from './ForgotPassword';
import { validateEmail, validatePassword } from '../../utils/formValidation';
import { useAuth } from '../../context/AuthContext';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const { currentUser } = useAuth();
    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);

    console.log(auth?.currentUser?.email);

    const validateForm = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        const newErrors = {
            email: emailError,
            password: passwordError,
        };

        setErrors(newErrors);

        return !(emailError || passwordError);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Signed in successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            const newErrors = { ...errors };

            if (error.code === 'auth/wrong-password') {
                newErrors.password = 'Wrong password';
            } else if (error.code === 'auth/user-not-found') {
                newErrors.email = 'Email is not registered';
            } else {
                newErrors.signIn = error.message;
            }
            setErrors(newErrors);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    const toggleForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    };

    if (showForgotPassword) {
        return <ForgotPassword toggleForgotPassword={toggleForgotPassword} />;
    }

    return (
        <div className="signin">
            <form onSubmit={handleSignIn} className="signin-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
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
                <label className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="mr-2"
                    />
                    Remember Me
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2 mt-4 w-full"
                >
                    Sign In
                </button>
            </form>
            <button
                onClick={handleGoogleSignIn}
                className="bg-red-500 text-white rounded px-4 py-2 mt-4 w-full"
            >
                Sign In With Google
            </button>
            <button
                onClick={toggleForgotPassword}
                className="text-blue-500 text-sm mt-4 block text-center bg-transparent border-none cursor-pointer outline-none focus:outline-none"
            >
                Forgot password?
            </button>
        </div>
    );
};

export default SignIn;
