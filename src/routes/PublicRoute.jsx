import { Navigate, Outlet } from "react-router-dom";
import userStore from "../zustand/userStore";

const PublicRoute = () => {
  const { user } = userStore();
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
