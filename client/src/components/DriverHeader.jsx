import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton"; // import your reusable component

const DriverHeader = () => {
  const driverName = localStorage.getItem("userName");

  return (
  <header className="bg-linear-to-r from-indigo-600 to-blue-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/driver" className="text-2xl font-bold tracking-tight">
          WasteDriver
        </Link>

        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-lg">Hello, {driverName} 👋</span>

          <nav className="flex items-center gap-4">
            <Link
              to="/driver"
              className="hover:text-gray-200 transition font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/driver/profile"
              className="hover:text-gray-200 transition font-medium"
            >
              Profile
            </Link>
            <LogoutButton className="ml-4" /> {/* use your LogoutButton component */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DriverHeader;
