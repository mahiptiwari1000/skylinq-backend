import express from "express";
const router = express.Router();

// Dummy STATIC data for now — replace later with MongoDB
const activeDeliveries = [
  {
    deliveryId: "DEL-001",
    type: "Heart - Transplant",
    status: "in-transit",
    priority: "Critical",
    pickupHospital: "Houston Methodist Hospital",
    destinationHospital: "MD Anderson Cancer Center",
    progress: 75,
    eta: "14:32",
    temperature: "2.8°C",
    flightId: "PEGA-001",
  },
  {
    deliveryId: "DEL-002",
    type: "Blood Products (8 units)",
    status: "pending",
    priority: "Standard",
    pickupHospital: "Texas Children's Hospital",
    destinationHospital: "Memorial Hermann",
    progress: 15,
    eta: "15:45",
    temperature: "4.1°C",
    flightId: "PEGA-003",
  },
  {
    deliveryId: "DEL-003",
    type: "Kidney - Transplant",
    status: "preparing",
    priority: "High",
    pickupHospital: "Baylor St. Luke's",
    destinationHospital: "Houston Methodist",
    progress: 5,
    eta: "16:15",
    temperature: "3.2°C",
    flightId: "PEGA-002",
  },
];

const recentHistory = [
  {
    title: "Liver - Transplant",
    hospital: "MD Anderson",
    date: "2024-01-15",
    time: "12:15",
  },
  {
    title: "Blood Products",
    hospital: "Memorial Hermann",
    date: "2024-01-14",
    time: "16:45",
  },
  {
    title: "Tissue Samples",
    hospital: "Texas Children's",
    date: "2024-01-14",
    time: "10:30",
  },
];

const coldChain = [
  { deliveryId: "DEL-001", temperature: "2.8°C", status: "Optimal" },
  { deliveryId: "DEL-002", temperature: "4.1°C", status: "Optimal" },
  { deliveryId: "DEL-003", temperature: "3.2°C", status: "Optimal" },
];

// ----------------------
// ROUTES
// ----------------------
router.get("/activeDeliveries", (req, res) => {
  res.json(activeDeliveries);
});

router.get("/history", (req, res) => {
  res.json(recentHistory);
});

router.get("/coldchain", (req, res) => {
  res.json(coldChain);
});

export default router;
