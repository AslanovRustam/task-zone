import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/selectors";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
