import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone", required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Changed from "Driver" to "User"
  },
  { timestamps: true }
);

const Route = mongoose.model("Route", routeSchema);
export default Route;