import React from 'react';
import { useState, useEffect } from "react";
import Routes from './routes/Routes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { ChartDataProvider } from './context/ChartDataContext.jsx';
import './App.css';
import 'typeface-inter';
import "flowbite";

function App() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="App">
            <AuthProvider>
                <AppProvider>
                    {/*<ChartDataProvider>*/}
                        <Routes />
                    {/*</ChartDataProvider>*/}
                </AppProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
