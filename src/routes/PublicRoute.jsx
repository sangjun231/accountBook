import { Navigate } from "react-router-dom";
import userStore from "../zustand/userStore";

const PublicRoute = ({ element }) => {
  const { user } = userStore();

  return !user ? element : <Navigate to="/" />;

  //   const { user } = userStore();

  //   return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
