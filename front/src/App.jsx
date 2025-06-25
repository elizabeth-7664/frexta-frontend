import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import ClientDetails from './pages/ClientDetails';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Payments from './pages/Payments';
import ClientNotes from './pages/ClientNotes';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/clients"
            element={<ProtectedRoute><Clients /></ProtectedRoute>}
          />
          <Route
            path="/clients/:id"
            element={<ProtectedRoute><ClientDetails /></ProtectedRoute>}
          />
          <Route
            path="/clients/:id/notes"
            element={<ProtectedRoute><ClientNotes /></ProtectedRoute>}
          />
          <Route
            path="/projects"
            element={<ProtectedRoute><Projects /></ProtectedRoute>}
          />
          <Route
            path="/projects/:id"
            element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>}
          />
          <Route
            path="/payments"
            element={<ProtectedRoute><Payments /></ProtectedRoute>}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute><Settings /></ProtectedRoute>}
          />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
