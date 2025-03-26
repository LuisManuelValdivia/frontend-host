// ProtectedRouteUser.tsx
import React, { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteUserProps {
  children: ReactNode;
}

function ProtectedRouteUser({ children }: ProtectedRouteUserProps) {
  const { isLoggedIn, user } = useContext(AuthContext);

  if (!isLoggedIn || user?.rol !== 'usuario') {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRouteUser;
