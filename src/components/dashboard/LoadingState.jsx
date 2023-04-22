import React from 'react';
import { Dna } from 'react-loader-spinner';

const LoadingState = () => {
    return (
        <div className="loading-screen flex flex-col justify-center items-center bg-gray-100 h-screen">
            <div className="mt-20">
                <img src="/assets/healthmate-main.png" alt="HealthMate Logo" className="h-36 mr-4"/>
            </div>
            <div className="mb-20">
                <Dna
                    visible={true}
                    height={200}
                    width={200}
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        </div>
    );
};

export default LoadingState;
