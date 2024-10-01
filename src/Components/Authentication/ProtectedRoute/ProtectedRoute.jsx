import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthUser from '../AuthUser/AuthUser';

const ProtectedRoute = ({ children }) => {
  const { isLogin } = AuthUser();
  const token = isLogin();

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
