import React from "react";
import { Navigate } from "react-router-dom";

const RedirectIfLoggedIn = ({ children }) => {
  // Get the stored role from localStorage
  const role = localStorage.getItem("role")?.toLowerCase();

  if (role === "resident") return <Navigate to="/resident" replace />;
  if (role === "driver") return <Navigate to="/driver" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;

  // If no role, allow access to children (Login/Register pages)
  return children;
};

export default RedirectIfLoggedIn;
