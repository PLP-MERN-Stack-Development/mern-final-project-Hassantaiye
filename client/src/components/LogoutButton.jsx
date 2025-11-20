import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // removes token from localStorage
    localStorage.removeItem("role"); // remove role
    navigate("/login"); // redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
