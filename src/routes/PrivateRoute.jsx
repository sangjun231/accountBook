import { Navigate } from "react-router-dom";
import userStore from "../zustand/userStore";

const PrivateRoute = ({ element }) => {
  const { user } = userStore();

  return user ? element : <Navigate to="/sign_in" />;

  // const { user } = userStore();

  // return user ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default PrivateRoute;
