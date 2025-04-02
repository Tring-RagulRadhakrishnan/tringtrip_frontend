import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/signUp/SignUp";
import SignIn from "../pages/signIn/SignIn";
import Home from "../pages/home/Home";
import Auth from "../components/auth/Auth";
import Package from "../pages/tripPack/TripPack";
import AllPackages from "../pages/allPackages/AllPackages";
import AddPackage from "../pages/addPackage/AddPackage";
import BookPackage from "../pages/bookPackage/BookPackage";
import SearchPackage from "../components/searchPackage/SearchPackage";
import Profile from "../components/profile/Profile";
import MyBookings from "../pages/myBookings/MyBookings";

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
        <Route path="/searchpackage" element={<SearchPackage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mybookings" element={<MyBookings />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
