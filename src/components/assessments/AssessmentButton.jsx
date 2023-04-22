import React from 'react';

const AssessmentButton = ({ onClick, className, children }) => {
    return (
        <button
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    );
};

export default AssessmentButton;
