import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ children, ...props }) => {
  return props.loggedIn ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRouteElement;
