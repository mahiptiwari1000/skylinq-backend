// models/Request.js
import mongoose from "mongoose";

const updateSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["info", "success", "warning", "alert"],
      default: "info",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const requestSchema = new mongoose.Schema(
  {
    requestId: { type: String, required: true, unique: true }, // e.g. REQ-001
    priority: {
      type: String,
      enum: ["STAT", "Standard"],
      default: "Standard",
    },
    tags: [String], // e.g. ["STAT", "Critical"] or ["CoC", "Standard"]

    status: {
      type: String,
      enum: ["in-transit", "pending", "completed", "cancelled"],
      default: "pending",
    },

    fromHospital: { type: String, required: true },
    toHospital: { type: String, required: true },
    cargo: { type: String, required: true },

    progress: { type: Number, min: 0, max: 100, default: 0 },

    // For display
    eta: { type: String, default: "—" },
    // For analytics (average ETA)
    etaMinutes: { type: Number },

    temp: { type: String, default: "N/A" },

    updates: [updateSchema],
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
