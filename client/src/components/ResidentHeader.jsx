import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const ResidentHeader = () => {
  const userName = localStorage.getItem("userName") || "Resident";

  return (
  <header className="bg-linear-to-r from-green-600 to-teal-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/resident" className="text-2xl font-bold tracking-tight">
          WasteResident
        </Link>

        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-lg">Hello, {userName} 👋</span>

          <nav className="space-x-4">
            <Link
              to="/resident"
              className="hover:text-gray-200 transition font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/resident/mypickups"
              className="hover:text-gray-200 transition font-medium"
            >
              My Pickups
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ResidentHeader;
