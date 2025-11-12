import express from "express";

const router = express.Router();

// TEMP STATIC — replace with DB later
let fleet = [
  {
    id: "PEGA-001",
    status: "in-flight",
    battery: 87,
    temp: "2.8°C",
    location: "En route to MD Anderson",
    mission: "STAT - Heart Transport",
    eta: "14:32",
  },
  {
    id: "PEGA-002",
    status: "available",
    battery: 95,
    temp: "3.2°C",
    location: "PEGA Base - Houston",
    mission: "Standby",
    eta: "Ready",
  },
  {
    id: "PEGA-003",
    status: "maintenance",
    battery: 45,
    temp: "N/A",
    location: "Service Hangar B",
    mission: "Scheduled Maintenance",
    eta: "16:00",
  },
  {
    id: "PEGA-004",
    status: "in-flight",
    battery: 72,
    temp: "4.1°C",
    location: "En route to Memorial Hermann",
    mission: "Standard - Blood Products",
    eta: "15:15",
  },
];

router.get("/", (req, res) => {
  res.json(fleet);
});

export default router;
