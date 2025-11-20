import { Server } from "socket.io";

export default function socketHandler(server) {
  const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST", "PUT"] },
  });

  const drivers = new Map(); // socket.id -> {id, name, lat, lng}

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Driver updates location
    socket.on("updateLocation", (data) => {
      const driver = { id: data.id, name: data.name, lat: data.lat, lng: data.lng };
      drivers.set(socket.id, driver);
      io.emit("driverLocationUpdate", driver); // broadcast to all clients
    });

    socket.on("disconnect", () => {
      drivers.delete(socket.id);
    });
  });

  return io;
}
