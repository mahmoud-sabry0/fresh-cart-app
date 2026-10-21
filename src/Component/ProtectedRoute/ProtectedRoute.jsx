import { Navigate } from "react-router-dom";
import "./ProtectedRoute.module.css";

import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function ProtectedRoute(props) {
  const { userToken } = useContext(UserContext);

  if (userToken) {
    return props.children;
  }
  return <Navigate to={"/login"} replace />;
}
