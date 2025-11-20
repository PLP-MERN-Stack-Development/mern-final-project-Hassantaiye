import express from "express";
import PickupRequest from "../models/PickupRequest.js";

const router = express.Router();

// GET /api/admin/activity/recent
router.get("/recent", async (req, res) => {
  try {
    const pickups = await PickupRequest.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate("driver", "name")
      .populate("resident", "name");

    const activity = pickups.map((p) => {
      if (p.status === "completed") {
        return {
          action: "Pickup completed",
          location: p.address,
          time: "Just now",
        };
      } else if (p.status === "pending") {
        return {
          action: "New pickup request",
          location: p.address,
          time: "Just now",
        };
      } else if (p.driver) {
        return {
          action: "Driver assigned",
          location: p.address,
          time: "Just now",
        };
      }
      return null;
    }).filter(Boolean);

    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;