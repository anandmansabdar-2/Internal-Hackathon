import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}
