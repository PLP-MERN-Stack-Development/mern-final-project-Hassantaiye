import React, { useEffect, useState } from "react";
import { getMyPickups } from "../../api/pickupApi";
import PickupCard from "../../components/PickupCard";
import ResidentHeader from "../../components/ResidentHeader";
import ResidentFooter from "../../components/ResidentFooter";

const MyPickups = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const data = await getMyPickups();
        setPickups(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPickups();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ResidentHeader />

  <main className="grow max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Pickups</h1>

        {loading ? (
          <p className="text-gray-600">Loading pickups...</p>
        ) : pickups.length === 0 ? (
          <p className="text-gray-600">No pickups found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {pickups.map((pickup) => (
              <div
                key={pickup._id}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
              >
                <PickupCard pickup={pickup} />
                <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Scheduled:{" "}
                    <strong>{new Date(pickup.scheduledDate).toLocaleDateString()}</strong>
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      pickup.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : pickup.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : pickup.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {pickup.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <ResidentFooter />
    </div>
  );
};

export default MyPickups;
