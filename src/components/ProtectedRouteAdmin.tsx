// ProtectedRouteAdmin.tsx
import React, { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode; // O JSX.Element
  }
  
  function ProtectedRouteAdmin({ children }: ProtectedRouteProps) {
    const { isLoggedIn, user } = useContext(AuthContext);
  
    if (!isLoggedIn || user?.rol !== 'admin') {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  }
  
  export default ProtectedRouteAdmin;
