import React from "react";
import { MapPin, Clock, Truck } from "lucide-react";

const PickupCard = ({ pickup }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "missed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{pickup.title || "Pickup"}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(pickup.status)}`}>
          {pickup.status || "Unknown"}
        </span>
      </div>

      <div className="space-y-2 text-gray-700">
        <p className="flex items-center gap-2">
          <MapPin size={16} /> {pickup.address || "No address provided"}
        </p>
        <p className="flex items-center gap-2">
          <Clock size={16} /> {new Date(pickup.scheduledAt).toLocaleString() || "N/A"}
        </p>
        <p className="flex items-center gap-2">
          <Truck size={16} /> Vehicle: {pickup.vehicle?.plateNumber || "Unassigned"}
        </p>
      </div>
    </div>
  );
};

export default PickupCard;
