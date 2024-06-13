import { Navigate } from "react-router-dom";
import userStore from "../zustand/userStore";

const PublicRoute = ({ element }) => {
  const { user } = userStore();

  return !user ? element : <Navigate to="/" />;
};

export default PublicRoute;
