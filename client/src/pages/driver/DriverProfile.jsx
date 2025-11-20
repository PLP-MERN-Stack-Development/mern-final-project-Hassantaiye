import React, { useState, useEffect } from "react";
import { getDriverById, updateDriverProfile } from "../../api/driverApi";
import toast from "react-hot-toast";
import { User, Phone, Truck } from "lucide-react";
import DriverHeader from "../../components/DriverHeader";
import DriverFooter from "../../components/DriverFooter";

const DriverProfilePage = () => {
  const driverId = localStorage.getItem("userId");

  const [form, setForm] = useState({ name: "", phone: "", vehicle: {} });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch driver profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDriverById(driverId);
        setForm({ name: data.name, phone: data.phone, vehicle: data.vehicle || {} });
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [driverId]);

  // Save changes
  const handleSave = async () => {
    if (!form.name) return toast.error("Name cannot be empty");

    setSaving(true);
    try {
      const updatedDriver = await updateDriverProfile({ name: form.name, phone: form.phone });
      toast.success("Profile updated!");
      localStorage.setItem("userName", updatedDriver.name);
      setForm(prev => ({ ...prev, ...updatedDriver }));
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col">
        <DriverHeader />
  <main className="grow flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading profile...</p>
        </main>
        <DriverFooter />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DriverHeader />

  <main className="grow max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Driver Profile</h1>

        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="text-gray-700 font-semibold">Name</label>
            <div className="flex items-center gap-2 mt-1">
              <User size={20} />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-gray-700 font-semibold">Phone</label>
            <div className="flex items-center gap-2 mt-1">
              <Phone size={20} />
              <input
                type="text"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Truck size={20} /> Vehicle Details
            </h2>
            <p className="text-gray-700">
              <strong>Plate Number:</strong> {form.vehicle?.plateNumber || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Type:</strong> {form.vehicle?.type || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {form.vehicle?.status || "N/A"}
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 w-full bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </main>

      <DriverFooter />
    </div>
  );
};

export default DriverProfilePage;
