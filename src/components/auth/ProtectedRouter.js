import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRouter = ({ children }) => {
  const { token } = useAuth();
  // const location = useLocation();
  if (!token) {
    return <Navigate to="/dashboards" />;
  }

  return children;
};

export default ProtectedRouter;
