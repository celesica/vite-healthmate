import React from 'react';
import { useState, useEffect } from "react";
import Routes from './routes/Routes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { updateUserPresenceStatus } from './config/firebase';
import { useAuth } from './context/AuthContext';
import './App.css';
import 'typeface-inter';
import "flowbite";
// import OnlineNotifications from "./components/chat/OnlineNotifications.jsx";

function App() {
    const { currentUser } = useAuth();
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    useEffect(() => {
        if (currentUser) {
            updateUserPresenceStatus(currentUser.uid, true);

            window.addEventListener('beforeunload', () => {
                updateUserPresenceStatus(currentUser.uid, false);
            });

            return () => {
                updateUserPresenceStatus(currentUser.uid, false);
                window.removeEventListener('beforeunload', () => {
                    updateUserPresenceStatus(currentUser.uid, false);
                });
            };
        }
    }, [currentUser]);

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="App">
            <AuthProvider>
                <AppProvider>
                    {/*<OnlineNotifications />*/}
                    <Routes />
                </AppProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
