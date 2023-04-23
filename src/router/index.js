import React, { useContext, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spiner from "./Spiner";

import { ProjectContext } from "../components/Context";
import ProtectedRoute from "./ProtectedRoute";
import Registration from "../components/Auth/Registration/Registration";
import ProductDetails from "../components/ProductsC/ProductDetails/ProductDetails";
import Profile from "../components/Profile/Profile";
import Home from "../components/Home/Home";
import UsersList from "../components/UsersC/UsersList/UsersList";
import UserDetails from "../components/UsersC/UserDetails/UserDetails";
import AddUser from "../components/UsersC/AddUser/AddUser";
import CreateProduct from "../components/ProductsC/CreateProduct/CreateProduct";
import Dashoboard from "../components/Dashboard/Dashoboard";

const Navbar = lazy(() => import("../components/Navbar/Navbar"));
const Login = lazy(() => import("../components/Auth/Login/Login"));
const Products = lazy(() =>
  import("../components/ProductsC/Products/Products")
);
const NotFound = lazy(() => import("../components/NotFound"));

const RouteIndex = () => {
  const [state] = useContext(ProjectContext);
  return (
    <BrowserRouter>
      <Suspense fallback={<Spiner />}>
        {state.login.is_authenticated && <Navbar />}
        <div className="container">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            {/* <Route exact path="/registration" element={<Registration />} /> */}
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route exact path="/" element={<Home />} />
            </Route>

            {/* PRODUCTS */}
            <Route exact path="/products" element={<ProtectedRoute />}>
              <Route exact path="/products" element={<Products />} />
            </Route>
            <Route exact path="/addproduct" element={<ProtectedRoute />}>
              <Route exact path="/addproduct" element={<CreateProduct />} />
            </Route>
            <Route exact path="/product/:id" element={<ProtectedRoute />}>
              <Route exact path="/product/:id" element={<ProductDetails />} />
            </Route>

            {/* USERS */}
            <Route exact path="/users" element={<ProtectedRoute />}>
              <Route exact path="/users" element={<UsersList />} />
            </Route>
            <Route exact path="/adduser" element={<ProtectedRoute />}>
              <Route exact path="/adduser" element={<AddUser />} />
            </Route>
            <Route exact path="/user/:username" element={<ProtectedRoute />}>
              <Route exact path="/user/:username" element={<UserDetails />} />
            </Route>

            <Route exact path="/profile" element={<ProtectedRoute />}>
              <Route exact path="/profile" element={<Profile />} />
            </Route>

            <Route exact path="/dashboard" element={<ProtectedRoute />}>
              <Route exact path="/dashboard" element={<Dashoboard />} />
            </Route>

            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouteIndex;
