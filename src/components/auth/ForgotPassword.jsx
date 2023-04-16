import React, { useState } from 'react';
import Modal from 'react-modal';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const ForgotPassword = ({ isOpen, onRequestClose }) => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage('Instructions to reset your password has been sent to your email.');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <h2 className="text-center text-2xl font-bold mb-4">Forgot Password?</h2>
            <p className="mb-4 text-center">
                Enter the email address you used when you joined and we'll send you instructions to reset your password.
            </p>
            {successMessage ? (
                <p className="text-green-500 text-center">{successMessage}</p>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 mt-4 w-full"
                    >
                        Reset password
                    </button>
                </form>
            )}
        </Modal>
    );
};

export default ForgotPassword;
