import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { ChartDataProvider } from '../context/ChartDataContext';
import PrivateRoute from './PrivateRoute.jsx';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import TestPages from "../pages/TestPages.jsx";
import FunAssessmentPage from '../pages/formPages/FunAssessmentPage';
import SleepAssessmentPage from '../pages/formPages/SleepAssessmentPage';
import ExerciseAssessmentPage from '../pages/formPages/ExerciseAssessmentPage';
import EnvironmentAssessmentPage from '../pages/formPages/EnvironmentAssessmentPage';
import AssessmentsPage from "../pages/AssessmentsPage.jsx";
import AnalyticsPage from "../pages/AnalyticsPage.jsx";
import DietAssessmentPage from "../components/assessments/DietAssessment.jsx";
import MessagesPage from "../pages/MessagesPage.jsx";
import Settings from "../pages/Settings.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

const WrappedRoutes = () => {
    return (
        <ChartDataProvider>
            <Routes>
                <Route path="/dashboard" index element={<DashboardPage />} />
                <Route path="/assessments" index element={<AssessmentsPage />} />
                <Route path="/analytics" index element={<AnalyticsPage />} />
                <Route path="/profile" index element={<ProfilePage />} />
                <Route path="/messages" index element={<MessagesPage />} />
                <Route path="/test" index element={<TestPages />} />
                <Route path="/settings" index element={<Settings />} />
                <Route path="/fun-test" index element={<FunAssessmentPage />} />
                <Route path="/sleep-test" index element={<SleepAssessmentPage />} />
                <Route path="/exercise-test" index element={<ExerciseAssessmentPage />} />
                <Route path="/environment-test" index element={<EnvironmentAssessmentPage />} />
                <Route path="/diet-test" index element={<DietAssessmentPage />} />
            </Routes>
        </ChartDataProvider>
    );
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/" element={<HomePage />} />
                <Route element={<PrivateRoute />} >
                    <Route path="/*" element={<WrappedRoutes />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
