import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/query/UserQuery";
const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userContext);
  const { data, refetch, loading, error } = useQuery(GET_USER, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    console.log("data?.getUser", data?.getUser, userData, loading);
    if (loading === false) {
      if (data?.getUser) {
        setUserData(data?.getUser);
      } else {
        toast.error("Sign In to Acces");
        navigate("/signin");
      }
    }
  }, [loading]);
  return children;
};

export default ProtectedRoutes;
