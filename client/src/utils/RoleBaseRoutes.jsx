import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  // Show loading state while authentication is being verified
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to unauthorized page if the user's role is not in the required roles
  if (!user || !requiredRole.includes(user.role)) {
    <Navigate to="/unauthorized" />;
  }

  // Render children if user is authenticated and has the required role
  return user ? children : <Navigate to="/login" />
};

export default RoleBaseRoutes;
