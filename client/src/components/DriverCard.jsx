import React from "react";
import { Mail, Phone, Truck } from "lucide-react";

const DriverCard = ({ driver }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition">
      <div className="flex items-center gap-4">
        <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
          {driver.name.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-semibold">{driver.name}</h2>
          <p className="text-gray-500">{driver.email}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-gray-700">
        <p className="flex items-center gap-2">
          <Phone size={16} /> {driver.phone || "No phone"}
        </p>

        <p className="flex items-center gap-2">
          <Truck size={16} />{" "}
          {driver.vehicle?.plateNumber || "No vehicle assigned"}
        </p>
      </div>
    </div>
  );
};

export default DriverCard;
