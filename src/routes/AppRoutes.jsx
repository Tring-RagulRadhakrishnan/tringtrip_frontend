import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import ProtectedRoutes from "./ProtectedRoutes";
import { userContext } from "../App";
import Cookies from 'js-cookie';
import { useQuery } from "@apollo/client";
import { GET_COOKIE } from "../graphql/query/UserQuery";

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { data, loading, error } = useQuery(GET_COOKIE, {
    fetchPolicy: "no-cache",
    credentials: "include",
  });

  useEffect(() => {
    if (data?.getCookie) {
      setIsLoggedIn(true);
    }
  }, [data]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="" element={<Auth />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/package/:location" element={<Package />} />
        <Route path="/allpackages" element={<AllPackages />} />
        <Route
          path="/addpackage"
          element={
            <ProtectedRoutes>
              <AddPackage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/bookpackage"
          element={
            <ProtectedRoutes>
              <BookPackage />
            </ProtectedRoutes>
          }
        />
        <Route path="/searchpackage" element={<SearchPackage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="/mybookings" element={isLoggedIn?<MyBookings />:<Navigate to="/signin" />} />
        {/* <Route
          path="/mybookings"
          element={
            <ProtectedRoutes>
              <MyBookings />
            </ProtectedRoutes>
          }
        /> */}
      </Routes>
    </>
  );
};

export default AppRoutes;
