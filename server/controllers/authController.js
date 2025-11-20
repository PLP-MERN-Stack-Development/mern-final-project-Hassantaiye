import User from "../models/User.js";
import Vehicle from "../models/Vehicle.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc   Register a user
// @route  POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, plateNumber, vehicleType, vehicleStatus } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role, phone });

    // If driver, create vehicle and link
    if (role === "driver") {
      if (!plateNumber) return res.status(400).json({ message: "Driver must have a vehicle plate number" });

      const vehicle = await Vehicle.create({
        driver: newUser._id,
        plateNumber,
        type: vehicleType || "truck",
        status: vehicleStatus || "available",
      });

      newUser.vehicle = vehicle._id;
    }

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        vehicle: newUser.vehicle || null,
        token,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Login user
// @route  POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).populate("vehicle");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        vehicle: user.vehicle || null,
        token,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get current user
// @route  GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").populate("vehicle");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};