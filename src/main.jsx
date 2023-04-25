import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext';
import './index.css'
import 'tw-elements';
// import OnlineNotifications from "./components/chat/OnlineNotifications.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
          {/*<OnlineNotifications />*/}
          <App />
      </AuthProvider>
  </React.StrictMode>,
)
