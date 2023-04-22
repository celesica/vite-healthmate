import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={handleClickOutside}
        >
            <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6 overflow-y-auto max-h-screen">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default Modal;
