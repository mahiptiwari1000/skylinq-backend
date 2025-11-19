// models/Flight.js
import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["in-flight", "available", "maintenance", "offline"],
      default: "available",
    },
    battery: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    temp: {
      type: String,
      default: "N/A",
    },
    location: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
    eta: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#3b82f6",
    },
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", flightSchema);
export default Flight;
