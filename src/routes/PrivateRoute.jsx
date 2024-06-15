import { Navigate, Outlet } from "react-router-dom";
import userStore from "../zustand/userStore";

const PrivateRoute = () => {
  const { user } = userStore();
  return user ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default PrivateRoute;
