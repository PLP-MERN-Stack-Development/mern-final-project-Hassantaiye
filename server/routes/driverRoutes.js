import express from "express";
import {
  getDrivers,
  getDriverById,
  updateDriverProfile,
  updateDriverLocation
} from "../controllers/driverController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin routes
router.get("/", protect, adminOnly, getDrivers);
router.get("/:id", protect, getDriverById);

// Driver routes
router.put("/profile", protect, updateDriverProfile);       // ✅ THIS
router.put("/location", protect, updateDriverLocation);

export default router;
