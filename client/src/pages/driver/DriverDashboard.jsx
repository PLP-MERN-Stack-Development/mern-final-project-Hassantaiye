import React, { useEffect, useState } from "react";
import { getMyPickups } from "../../api/pickupApi";
import toast from "react-hot-toast";
import DriverHeader from "../../components/DriverHeader";
import DriverFooter from "../../components/DriverFooter";
import PickupCard from "../../components/PickupCard"; 

const DriverDashboard = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const data = await getMyPickups();
        setPickups(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load pickups");
      } finally {
        setLoading(false);
      }
    };
    fetchPickups();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DriverHeader />

  <main className="grow max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Driver Dashboard</h1>

        {loading ? (
          <p className="text-gray-500 text-center mt-10">Loading your pickups...</p>
        ) : pickups.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No pickups assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pickups.map((pickup) => (
              <PickupCard key={pickup._id} pickup={pickup} />
            ))}
          </div>
        )}
      </main>

      <DriverFooter />
    </div>
  );
};

export default DriverDashboard;
