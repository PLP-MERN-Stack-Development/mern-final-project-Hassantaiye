import User from "../models/User.js";
import Vehicle from "../models/Vehicle.js";

// @desc   Get all drivers (admin only)
// @route  GET /api/drivers
export const getDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" }).populate("vehicle");
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc   Get driver by ID (admin or driver)
// @route  GET /api/drivers/:id
export const getDriverById = async (req, res) => {
  try {
    const driver = await User.findById(req.params.id).populate("vehicle");

    if (!driver || driver.role !== "driver")
      return res.status(404).json({ message: "Driver not found" });

    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update driver profile
// @route  PUT /api/drivers/profile
export const updateDriverProfile = async (req, res) => {
  try {
    const driver = await User.findById(req.user._id);

    if (!driver || driver.role !== "driver")
      return res.status(404).json({ message: "Driver not found" });

    const { name, phone } = req.body;

    if (name) driver.name = name;
    if (phone) driver.phone = phone;

    await driver.save();

    res.json({ message: "Profile updated", driver });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update driver location (for live tracking)
// @route  PUT /api/drivers/location
export const updateDriverLocation = async (req, res) => {
  const { lat, lng } = req.body;

  try {
    const driver = await User.findById(req.user._id).populate("vehicle");

    if (!driver || driver.role !== "driver")
      return res.status(404).json({ message: "Driver not found" });

    if (!driver.vehicle) {
      return res
        .status(400)
        .json({ message: "Driver has no vehicle assigned" });
    }

    driver.vehicle.currentLocation = { lat, lng };
    await driver.vehicle.save();

    res.json({ message: "Location updated", location: driver.vehicle.currentLocation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
