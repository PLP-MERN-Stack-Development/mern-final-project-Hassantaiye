import express from "express";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in admin info
router.get("/me", protect, adminOnly, async (req, res) => {
  try {
    const admin = await User.findById(req.user._id).select("name email role");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({ status: "success", data: admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
