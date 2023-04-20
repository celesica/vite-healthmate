import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChartDataProvider } from '../context/ChartDataContext';
import PrivateRoute from './PrivateRoute.jsx';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import FunAssessmentPage from '../pages/formPages/FunAssessmentPage';
import SleepAssessmentPage from '../pages/formPages/SleepAssessmentPage';
import ExerciseAssessmentPage from '../pages/formPages/ExerciseAssessmentPage';
import EnvironmentAssessmentPage from '../pages/formPages/EnvironmentAssessmentPage';

const DashboardWithChartData = () => (
    <ChartDataProvider>
        <DashboardPage />
    </ChartDataProvider>
);
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/" element={<HomePage />} />
                <Route element={<PrivateRoute />} >
                    <Route path="/dashboard" index element={<DashboardWithChartData />} />
                    <Route path="/fun-test" index element={<FunAssessmentPage />} />
                    <Route path="/sleep-test" index element={<SleepAssessmentPage />} />
                    <Route path="/exercise-test" index element={<ExerciseAssessmentPage />} />
                    <Route path="/environment-test" index element={<EnvironmentAssessmentPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
