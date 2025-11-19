import mongoose from "mongoose";

const flightLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  flightId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    default: "N/A",
  },
  status: {
    type: String,
    enum: ["completed", "resolved", "pending", "alert"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["STAT", "Standard"],
    default: "Standard",
  },
  temp: {
    type: String,
    default: "N/A",
  },
});

export default mongoose.model("FlightLog", flightLogSchema);
