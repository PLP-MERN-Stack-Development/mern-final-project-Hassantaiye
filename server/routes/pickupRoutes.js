import express from "express";
import {
  createPickup,
  getAllPickups,
  getPickupById,
  updatePickupStatus,
  deletePickup,
  getPickupsByUser,
} from "../controllers/pickupController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Resident creates pickup
router.post("/", protect, authorizeRoles("resident"), createPickup);

// Admin gets all pickups
router.get("/", protect, authorizeRoles("admin"), getAllPickups);

// Resident or driver gets their own pickups
router.get("/my", protect, getPickupsByUser);

// Get single pickup by ID (admin/driver/resident)
router.get("/:id", protect, authorizeRoles("admin", "driver", "resident"), getPickupById);

// Update pickup status (admin/driver)
router.put("/:id/status", protect, authorizeRoles("admin", "driver"), updatePickupStatus);

// Delete pickup (admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deletePickup);

export default router;
