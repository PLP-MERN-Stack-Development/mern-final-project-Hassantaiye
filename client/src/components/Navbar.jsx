import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 shadow-md p-4 flex justify-center gap-6">
      <Link to="/" className="font-medium hover:text-green-600">Home</Link>
      <Link to="/login" className="font-medium hover:text-green-600">Login</Link>
      <Link to="/register" className="font-medium hover:text-green-600">Register</Link>
    </nav>
  );
};

export default Navbar;
