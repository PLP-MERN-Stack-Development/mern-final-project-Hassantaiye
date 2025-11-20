import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import pickupRoutes from "./routes/pickupRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import analyticsRoutes from "./routes/adminAnalytics.js";
import activityRoutes from "./routes/adminActivity.js"; // new recent activity route
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware - Improved CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or server-to-server requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'https://sdg-11-collection-transport-tracker.vercel.app',
      'https://waste-collection-transport-tracker.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173'
    ];
    
    // Check if the origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Allow all Vercel preview deployments
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    // Block the request
    callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pickups", pickupRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/admin/analytics", analyticsRoutes);
app.use("/api/admin/activity", activityRoutes);
app.use("/api/admin", adminRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Waste Tracker API is running...");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Create HTTP server for Socket.io
const server = http.createServer(app);

// Initialize Socket.io with improved CORS
export const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'https://sdg-11-collection-transport-tracker.vercel.app',
        'https://waste-collection-transport-tracker.vercel.app',
        'http://localhost:3000',
        'http://localhost:5173'
      ];
      
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  },
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // Listen for driver location updates
  socket.on("updateLocation", (driver) => {
    console.log("Driver location update:", driver);
    io.emit("driverLocationUpdate", driver); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// Server listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);