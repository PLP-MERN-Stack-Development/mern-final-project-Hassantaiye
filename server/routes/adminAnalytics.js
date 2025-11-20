import express from "express";
import User from "../models/User.js";
import PickupRequest from "../models/PickupRequest.js";

const router = express.Router();

router.get("/overview", async (req, res) => {
  try {
    const totalDrivers = await User.countDocuments({ role: "driver" });
    const totalResidents = await User.countDocuments({ role: "resident" });
    const totalPickups = await PickupRequest.countDocuments();
    const completedPickups = await PickupRequest.countDocuments({ status: "completed" });
    const pendingPickups = await PickupRequest.countDocuments({ status: "pending" });

    res.json({
      totalDrivers,
      totalResidents,
      totalPickups,
      completedPickups,
      pendingPickups,
      pickupsTrend: "+12%",
      driversTrend: "+3",
      completedTrend: "+8%"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Weekly stats
router.get("/weekly", async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const pickups = await PickupRequest.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyStats = pickups.map(p => ({
      day: days[p._id - 1],
      count: p.count
    }));

    res.json(weeklyStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Monthly stats
router.get("/monthly", async (req, res) => {
  try {
    const pickups = await PickupRequest.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyStats = pickups.map(p => ({
      month: months[p._id - 1],
      count: p.count
    }));

    res.json(monthlyStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Driver locations for heatmap
router.get("/driver-locations", async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).populate("vehicle");
    
    const locations = drivers
      .filter(d => d.vehicle && d.vehicle.currentLocation)
      .map(d => ({
        id: d._id,
        name: d.name,
        lat: d.vehicle.currentLocation.lat,
        lng: d.vehicle.currentLocation.lng
      }));

    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;