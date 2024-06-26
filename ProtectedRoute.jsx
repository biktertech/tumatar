import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.layout);

  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
