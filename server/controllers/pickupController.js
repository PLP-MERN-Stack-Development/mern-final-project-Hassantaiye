import PickupRequest from "../models/PickupRequest.js";
import User from "../models/User.js";

// @desc   Create a new pickup request
// @route  POST /api/pickups
export const createPickup = async (req, res) => {
  const { address, wasteType, scheduledDate, notes, location } = req.body;

  try {
    const pickup = await PickupRequest.create({
      resident: req.user._id,
      address,
      wasteType,
      scheduledDate,
      notes,
      location,
    });

    res.status(201).json({ message: "Pickup request created", pickup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all pickups (admin)
// @route  GET /api/pickups
export const getAllPickups = async (req, res) => {
  try {
    const pickups = await PickupRequest.find()
      .populate("resident", "name email")
      .populate("driver", "name email");
    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get pickups for logged-in user (resident or driver)
// @route  GET /api/pickups/my
export const getPickupsByUser = async (req, res) => {
  try {
    let query;
    if (req.user.role === "driver") {
      // Driver sees only assigned pickups
      query = { driver: req.user._id };
    } else {
      // Resident sees their pickups
      query = { resident: req.user._id };
    }

    const pickups = await PickupRequest.find(query)
      .populate("resident", "name email")
      .populate("driver", "name email");

    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get a single pickup by ID
// @route  GET /api/pickups/:id
export const getPickupById = async (req, res) => {
  try {
    const pickup = await PickupRequest.findById(req.params.id)
      .populate("resident", "name email")
      .populate("driver", "name email");

    if (!pickup) return res.status(404).json({ message: "Pickup not found" });

    res.json(pickup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update pickup status
// @route  PUT /api/pickups/:id/status
export const updatePickupStatus = async (req, res) => {
  const { status, driverId } = req.body;

  try {
    const pickup = await PickupRequest.findById(req.params.id);

    if (!pickup) return res.status(404).json({ message: "Pickup not found" });

    if (driverId) pickup.driver = driverId;
    if (status) pickup.status = status;

    await pickup.save();

    const updatedPickup = await PickupRequest.findById(req.params.id)
      .populate("resident", "name email")
      .populate("driver", "name email");

    res.json({ message: "Pickup updated", updatedPickup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a pickup (admin)
// @route  DELETE /api/pickups/:id
export const deletePickup = async (req, res) => {
  try {
    const pickup = await PickupRequest.findById(req.params.id);

    if (!pickup) return res.status(404).json({ message: "Pickup not found" });

    await pickup.remove();

    res.json({ message: "Pickup deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
