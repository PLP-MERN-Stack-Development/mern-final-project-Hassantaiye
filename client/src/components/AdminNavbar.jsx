import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex gap-6 justify-center font-medium">
      <Link to="/admin" className="hover:text-green-600">Dashboard</Link>
      <Link to="/admin/manage-pickups" className="hover:text-green-600">Pickups</Link>
      <Link to="/admin/manage-drivers" className="hover:text-green-600">Drivers</Link>
      <Link to="/admin/analytics" className="hover:text-green-600">Analytics</Link>
      <Link to="/admin/routes" className="hover:text-green-600">Routes</Link>
    </nav>
  );
};

export default AdminNavbar;
