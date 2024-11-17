import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import AuthProvider  from './context/authContext';  // Import AuthProvider
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';

function App() {
  return (
    <AuthProvider>  {/* Wrap the entire app in AuthProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login page */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
            <AdminDashboard />
            </RoleBaseRoutes>
            </PrivateRoutes>
            } />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
