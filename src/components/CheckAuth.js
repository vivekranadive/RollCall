import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckAuth = ({ isAuth, children }) => {
  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default CheckAuth;
