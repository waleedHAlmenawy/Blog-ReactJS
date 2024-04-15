import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";

const RequireAuth = () => {
  const { auth }: any = useAuth();
  const [cookies] = useCookies();
  const location = useLocation();

  return auth?.token || cookies.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
