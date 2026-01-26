import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ApplyLeaveForm from './pages/ApplyLeaveForm';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user.role === 'student' && <StudentDashboard />}
              {user.role === 'teacher' && <TeacherDashboard />}
              {user.role === 'admin' && <AdminDashboard />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply-leave"
          element={
            <ProtectedRoute requiredRole="student">
              <ApplyLeaveForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
