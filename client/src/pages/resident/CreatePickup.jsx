import React, { useState } from "react";
import { createPickup } from "../../api/pickupApi";
import toast from "react-hot-toast";
import ResidentHeader from "../../components/ResidentHeader";
import ResidentFooter from "../../components/ResidentFooter";

const CreatePickup = () => {
  const [formData, setFormData] = useState({
    address: "",
    wasteType: "household",
    scheduledDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPickup(formData);
      toast.success("Pickup requested successfully!");
      setFormData({
        address: "",
        wasteType: "household",
        scheduledDate: "",
        notes: "",
      });
    } catch (err) {
      toast.error("Error requesting pickup");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ResidentHeader />

  <main className="grow max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white shadow-md rounded-xl p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Request a Pickup
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter pickup address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Waste Type
              </label>
              <select
                name="wasteType"
                value={formData.wasteType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="household">Household</option>
                <option value="recyclable">Recyclable</option>
                <option value="medical">Medical</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Scheduled Date
              </label>
              <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions?"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                rows={4}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-green-600 transition disabled:opacity-50`}
            >
              {loading ? "Submitting..." : "Submit Pickup"}
            </button>
          </form>
        </div>
      </main>

      <ResidentFooter />
    </div>
  );
};

export default CreatePickup;
