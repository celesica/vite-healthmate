import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
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
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="relative mt-5 mb-5">
                    <input
                        id="password"
                        type="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-darkTeal bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-ownTeal peer"
                    />
                    <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-ownTeal peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <label className="flex items-center mt-7 mb-2">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="w-5 h-5 mr-3 rounded border-gray-300 focus:outline-none focus:ring-0 checked:bg-ownTeal"
                    />
                    <span className="text-sm">Remember Me</span>
                    <span className="ml-auto text-ownTeal text-sm cursor-pointer hover:text-ownOrange" onClick={toggleForgotPassword}>Forgot password?</span>
                </label>
                <button type="submit" className="w-full text-white bg-gradient-to-r from-ownTeal to-ownOrange hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-xl shadow-lg text-sm px-5 py-4 text-center mr-2 mb-3 mt-4">
                    Sign In
                </button>
            </form>
            <div className="flex justify-center items-center mt-2 mb-4">
                <span className="w-full border border-gray-200"></span>
                <span className="px-4">Or</span>
                <span className="w-full border border-gray-200"></span>
            </div>
            <button
                onClick={handleGoogleSignIn}
                className="mt-3 flex items-center justify-center flex-none px-5 py-3 md:px-4 md:py-3 border-2 rounded-xl border-ownTeal relative w-full text-darkTeal hover:bg-superLightTeal"
            >
                <span className="absolute left-4">
                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path fill="#EA4335 "
                        d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                  <path fill="#34A853"
                        d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                  <path fill="#4A90E2"
                        d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                  <path fill="#FBBC05"
                        d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
              </svg>
              </span>
                <span className="text-sm">Sign in with Google</span>
            </button>
        </div>
    );
};

export default SignIn;
