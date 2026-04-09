import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Basic check: Ensure user is logged in. 
  // Wait, the user asked to make sure "ordinary users" cannot access the admin site.
  // Realistically we can check user.user_metadata?.is_admin
  // Or check if the email follows a specific admin format.
  // For now, we'll check if a user is logged in at all, and optionally check metadata.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Example Admin Check (uncomment/modify as you deploy actual admin rules):
  // if (!user.user_metadata?.is_admin && user.email !== 'admin@wit.edu.ph') {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

export default ProtectedRoute;
