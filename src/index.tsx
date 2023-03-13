import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import './index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import reportWebVitals from './reportWebVitals';
import SSRProvider from 'react-bootstrap/SSRProvider';

import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateInvoice from './pages/CreateInvoice';
import NoMatch from './pages/NoMatch';
import { AuthProvider } from './contexts/AuthContext';
import RequireAuthHOC from './HOCs/RequireAuthHOC';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SSRProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="auth/login" element={<Login />} />
            <Route
              element={
                <RequireAuthHOC>
                  <App />
                </RequireAuthHOC>
              }
            >
              <Route
                path="dashboard"
                element={
                  <RequireAuthHOC>
                    <Dashboard />
                  </RequireAuthHOC>
                }
              />
              <Route
                path="invoice/create"
                element={
                  <RequireAuthHOC>
                    <CreateInvoice />
                  </RequireAuthHOC>
                }
              />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SSRProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
