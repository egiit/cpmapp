import React from 'react';

import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthProvider';

const ProtectedRouter = ({ children }) => {
  // const { token } = useAuth();
  const token = true;
  // const location = useLocation();
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouter;
