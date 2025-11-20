import React, { useEffect, useState } from "react";
import { getMyPickups } from "../../api/pickupApi";
import PickupCard from "../../components/PickupCard";
import LiveMap from "../../components/LiveMap";
import ResidentHeader from "../../components/ResidentHeader";
import ResidentFooter from "../../components/ResidentFooter";
import toast from "react-hot-toast";
import { socket, connectSocket, disconnectSocket } from "../../socket";

const ResidentDashboard = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) connectSocket(token);

    socket.on("driverLocationUpdate", (location) => {
      console.log("Driver location:", location);
      // Optional: update LiveMap with location
    });

    return () => {
      socket.off("driverLocationUpdate");
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const data = await getMyPickups();
        setPickups(data);
      } catch (err) {
        toast.error("Failed to load pickups");
      } finally {
        setLoading(false);
      }
    };
    fetchPickups();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ResidentHeader />

  <main className="grow max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Resident Dashboard</h1>

        <div className="my-6">
          <h2 className="text-xl font-bold mb-2">Live Driver Map</h2>
          <LiveMap />
        </div>

        <div className="mb-6 flex gap-4">
          <a
            href="/resident/create-pickup"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Request Pickup
          </a>
          <a
            href="/resident/mypickups"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            My Pickups
          </a>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading pickups...</p>
        ) : pickups.length === 0 ? (
          <p className="text-gray-500">No pickups found</p>
        ) : (
          <div className="grid gap-4">
            {pickups.map((pickup) => (
              <PickupCard key={pickup._id} pickup={pickup} />
            ))}
          </div>
        )}
      </main>

      <ResidentFooter />
    </div>
  );
};

export default ResidentDashboard;
