import React from 'react';
import Routes from './routes/routes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './App.css';

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </div>
    );
}

export default App;
