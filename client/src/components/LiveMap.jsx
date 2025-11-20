import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { socket, connectSocket, disconnectSocket } from "../socket";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LiveMap = () => {
  const [drivers, setDrivers] = useState([]); // {id, name, lat, lng}

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    connectSocket(token);

    // Listen for driver location updates
    socket.on("driverLocationUpdate", (driver) => {
      setDrivers((prev) => {
        const existing = prev.find((d) => d.id === driver.id);
        if (existing) {
          return prev.map((d) => (d.id === driver.id ? driver : d));
        } else {
          return [...prev, driver];
        }
      });
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <MapContainer
      center={[9.082, 8.6753]} // Nigeria center example
      zoom={6}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {drivers.map((driver) => (
        <Marker key={driver.id} position={[driver.lat, driver.lng]}>
          <Popup>
            {driver.name} <br /> Last update
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LiveMap;
