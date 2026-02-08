import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const PublicRoute = () => {
  const token = useSelector((state: RootState) => state.user.token);

  return token ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;
