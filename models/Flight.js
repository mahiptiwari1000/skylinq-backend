import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    flightId: String,
    status: String,
    eta: String,
    temperature: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Flight", flightSchema);
