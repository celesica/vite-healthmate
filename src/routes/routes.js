import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
