import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import FunAssessmentPage from '../pages/formPages/FunAssessmentPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/assessments" element={<FunAssessmentPage />} />
                <Route path="/dashboard" element={<PrivateRoute />} >
                    <Route index element={<DashboardPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
