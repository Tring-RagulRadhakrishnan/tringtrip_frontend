import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/signUp/SignUp";
import SignIn from "../pages/signIn/SignIn";
import Home from "../pages/home/Home";
import Auth from "../components/auth/Auth";

const AppRoutes = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Auth />} >
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
