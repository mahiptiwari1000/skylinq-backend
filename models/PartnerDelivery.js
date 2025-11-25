import mongoose from "mongoose";

const PartnerDeliverySchema = new mongoose.Schema({
  deliveryId: String,
  type: String,
  status: String,
  priority: String,
  pickupHospital: String,
  destinationHospital: String,
  progress: Number,
  eta: String,
  temperature: String,
  flightId: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("PartnerDelivery", PartnerDeliverySchema);
