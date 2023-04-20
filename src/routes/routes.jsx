import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import FunAssessmentPage from '../pages/formPages/FunAssessmentPage';
import SleepAssessmentPage from '../pages/formPages/SleepAssessmentPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/" element={<HomePage />} />
                <Route element={<PrivateRoute />} >
                    <Route path="/dashboard" index element={<DashboardPage />} />
                    <Route path="/fun-test" index element={<FunAssessmentPage />} />
                    <Route path="/sleep-test" index element={<SleepAssessmentPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
