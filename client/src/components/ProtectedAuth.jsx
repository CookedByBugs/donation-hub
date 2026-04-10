import React from "react";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedAuth = ({Component}) => {
  const { isAuth } = useAuthContext();
  if (isAuth) return <Navigate to="/dashboard" replace />
  return <Component />;
};

export default ProtectedAuth;
