import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Layout from "../components/Layout";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/detail/:id"
            element={<PrivateRoute element={<Detail />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/sign_in"
            element={<PublicRoute element={<SignIn />} />}
          />
          <Route
            path="/sign_up"
            element={<PublicRoute element={<SignUp />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/"  element={<PrivateRoute />}>

  //         <Route index element={<Home />} />
  //         <Route path="detail/:id" element={<Detail />} />
  //         <Route path="profile" element={<Profile />} />

  //     </Route>
  //     <Route element={<PublicRoute />}>
  //       <Route path="/sign_in" element={<SignIn />} />
  //       <Route path="/sign_up" element={<SignUp />} />
  //     </Route>
  //   </Routes>
  // </BrowserRouter>;
};

export default Router;
