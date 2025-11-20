import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },

  type: {
    type: String,
    enum: ["truck", "tricycle", "van"],
    default: "truck",
  },

  status: {
    type: String,
    enum: ["available", "on-route", "maintenance"],
    default: "available",
  },

  currentLocation: {
    lat: Number,
    lng: Number,
  }
}, { timestamps: true });

export default mongoose.model("Vehicle", vehicleSchema);
