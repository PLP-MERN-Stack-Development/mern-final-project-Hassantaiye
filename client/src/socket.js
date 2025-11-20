// socket.js
import { io } from "socket.io-client";

// Use Vite env variable or fallback
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// Create socket instance (autoConnect false to control connection manually)
export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

// Connect socket with optional auth token
export const connectSocket = (token) => {
  if (token) {
    socket.auth = { token }; // Send token for backend auth
  }
  socket.connect();
};

// Disconnect socket safely
export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

// Optional: helper to listen to events
export const onSocketEvent = (event, callback) => {
  socket.on(event, callback);
};

// Optional: helper to remove listener
export const offSocketEvent = (event, callback) => {
  socket.off(event, callback);
};
