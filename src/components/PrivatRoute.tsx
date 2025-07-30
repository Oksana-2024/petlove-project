import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
