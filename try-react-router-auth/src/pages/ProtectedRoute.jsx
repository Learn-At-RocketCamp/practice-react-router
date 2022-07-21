import { Navigate } from 'react-router-dom';

import { useAuth } from '../components/useAuth';

// const ProtectedRoute = ({ children }) => {
function ProtectedRoute({ children }) {
  const { token } = useAuth();
  // const navigate = useNavigate();

  /**
   * #NOTE: <ProtectedRoute.js>
   * `Uncaught SyntaxError: expected expression, got '<'`
   *
   * - Cos return `JSX` code. => `<fileName>.jsx`
   * This is not understandable by the navigators.
   */
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
