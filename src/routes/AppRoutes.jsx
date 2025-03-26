import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/signUp/SignUp";
import SignIn from "../pages/signIn/SignIn";
import Home from "../pages/home/Home";
import Auth from "../components/auth/Auth";
import Package from "../pages/package/Package";
import AllPackages from "../pages/allPackages/AllPackages";
import AddPackage from "../pages/addPackage/AddPackage";
import BookPackage from "../pages/bookPackage/BookPackage";
import StripePayment from "../components/StripePayment";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/package/:location" element={<Package />} />
        <Route path="/allpackages" element={<AllPackages />} />
        <Route path="/addpackage" element={<AddPackage />} />
        <Route path="/bookpackage" element={<BookPackage />} />
        <Route path="/payment" element={<StripePayment />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
