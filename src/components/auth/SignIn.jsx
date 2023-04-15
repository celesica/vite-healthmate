import React, { useState } from 'react';
import { auth } from '../../config/firebase';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
        }
    };

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
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full mt-4"
                />
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
            <a
                href="#"
                className="text-blue-500 text-sm mt-4 block text-center"
            >
                Forgot password?
            </a>
        </div>
    );
};

export default SignIn;
