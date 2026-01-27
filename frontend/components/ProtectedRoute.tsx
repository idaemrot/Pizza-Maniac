"use client";

import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  roles: Array<'User' | 'Admin'>;
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !roles.includes(user.role)) {
    // Redirect to a generic unauthorized page or their respective dashboard
    return <Navigate to={user.role === 'Admin' ? '/admin/dashboard' : '/user/menu'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;