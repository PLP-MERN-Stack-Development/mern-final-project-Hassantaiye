// src/layout/AdminLayout.jsx
import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import AdminNavbar from "../components/AdminNavbar"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Top Header */}
      <Header />

      {/* Admin Navigation Bar */}
      <AdminNavbar />

      {/* Body Section with Sidebar + Content */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-5 space-y-4">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

          <nav className="flex flex-col space-y-3">
            <Link className="text-blue-600 hover:underline" to="/admin">
              Dashboard
            </Link>

            <Link className="text-blue-600 hover:underline" to="/admin/manage-drivers">
              Manage Drivers
            </Link>

            <Link className="text-blue-600 hover:underline" to="/admin/manage-pickups">
              Manage Pickups
            </Link>

            <Link className="text-blue-600 hover:underline" to="/admin/analytics">
              Analytics
            </Link>
          </nav>

          <div className="mt-10">
            <LogoutButton />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;
