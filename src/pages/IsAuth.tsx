import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const IsAuth = () => {
  const { auth }: any = useAuth();
  const location = useLocation();

  console.log(auth);

  return auth?.token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default IsAuth;
