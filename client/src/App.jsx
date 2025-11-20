import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Resident
import ResidentDashboard from "./pages/resident/ResidentDashboard";
import CreatePickup from "./pages/resident/CreatePickup";
import MyPickups from "./pages/resident/MyPickups";

// Driver
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverProfile from "./pages/driver/DriverProfile";

// Admin
import AdminDashboard from "./pages/admin/AdminDashoard";
import ManageDrivers from "./pages/admin/ManageDrivers";
import ManagePickups from "./pages/admin/ManagePickups";

// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RedirectIfLoggedIn from "./components/auth/RedirectIfLoggedIn";

// Admin Pages
import Analytics from "./pages/admin/Analytics";
import RoutesPage from "./pages/admin/Routes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <Register />
            </RedirectIfLoggedIn>
          }
        />

        {/* Resident */}
        <Route
          path="/resident"
          element={
            <ProtectedRoute allowedRoles={["resident"]}>
              <ResidentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resident/create-pickup"
          element={
            <ProtectedRoute allowedRoles={["resident"]}>
              <CreatePickup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resident/mypickups"
          element={
            <ProtectedRoute allowedRoles={["resident"]}>
              <MyPickups />
            </ProtectedRoute>
          }
        />

        {/* Driver */}
        <Route
          path="/driver"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-drivers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageDrivers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-pickups"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManagePickups />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/routes" element={<RoutesPage />} />
        {/* DRIVER PROFILE */}
        <Route
          path="/driver/profile"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
