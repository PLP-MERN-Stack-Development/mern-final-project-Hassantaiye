import React, { useState, useEffect } from "react";
import { updateDriverLocation } from "../../api/driverApi";
import { socket, connectSocket } from "../../socket";
import LogoutButton from "../../components/LogoutButton";
import toast from "react-hot-toast";

const UpdateLocation = () => {
  const [location, setLocation] = useState({ lat: "", lng: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) connectSocket(token);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e) => setLocation({ ...location, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDriverLocation(location);
      socket.emit("updateLocation", {
        id: "driverId123", // replace with actual driver ID
        name: "Driver Name", // replace with actual driver name
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng),
      });
      toast.success("Location updated!");
    } catch (err) {
      toast.error("Failed to update location");
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Update Location</h1>
        <LogoutButton />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" name="lat" value={location.lat} onChange={handleChange} placeholder="Latitude" required className="w-full border px-2 py-1 rounded" step="any" />
        <input type="number" name="lng" value={location.lng} onChange={handleChange} placeholder="Longitude" required className="w-full border px-2 py-1 rounded" step="any" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default UpdateLocation;
