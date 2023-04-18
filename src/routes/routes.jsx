import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import PrivateRoute from './PrivateRoute.jsx';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<PrivateRoute />} >
                    <Route index element={<DashboardPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
