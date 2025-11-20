import mongoose from "mongoose";

const pickupRequestSchema = new mongoose.Schema({
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  wasteType: {
    type: String,
    enum: ["household", "recyclable", "medical", "industrial"],
    default: "household",
  },

  status: {
    type: String,
    enum: ["pending", "assigned", "on-route", "collected", "completed"],
    default: "pending",
  },

  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  scheduledDate: {
    type: Date,
  },

  notes: String,

  location: {
    lat: Number,
    lng: Number,
  },

}, { timestamps: true });

export default mongoose.model("PickupRequest", pickupRequestSchema);
