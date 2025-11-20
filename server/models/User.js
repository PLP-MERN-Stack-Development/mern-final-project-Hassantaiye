import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["resident", "driver", "admin"],
    default: "resident",
  },

  phone: {
    type: String,
  },

  // For drivers only
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
