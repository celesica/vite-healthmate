import React from 'react';
import { Dna } from 'react-loader-spinner';

const LoadingScreen = () => {
    return (
        <div
            className="loading-screen"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f6f7f8',
            }}
        >
            <Dna
                visible={true}
                height={200}
                width={200}
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    );
};

export default LoadingScreen;
