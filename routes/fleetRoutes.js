// routes/fleetRoutes.js
import express from "express";
import Flight from "../models/Flight.js";

const router = express.Router();

// GET /api/fleet  -> for Admin Console
router.get("/", async (req, res) => {
  try {
    const fleet = await Flight.find().sort({ id: 1 });
    res.json(fleet);
  } catch (err) {
    console.error("Error fetching fleet:", err.message);
    res.status(500).json({ message: "Server error fetching fleet" });
  }
});

// POST /api/fleet/seed  -> one-time seed
router.post("/seed", async (req, res) => {
  try {
    const existing = await Flight.countDocuments();
    if (existing > 0) {
      return res.status(400).json({ message: "Fleet already seeded" });
    }

    const sampleFleet = [
      {
        id: "PEGA-001",
        status: "in-flight",
        battery: 87,
        temp: "2.8°C",
        location: "En route to MD Anderson",
        mission: "STAT - Heart Transport",
        eta: "14:32",
        color: "#3b82f6",
      },
      {
        id: "PEGA-002",
        status: "available",
        battery: 95,
        temp: "3.2°C",
        location: "PEGA Base - Houston",
        mission: "Standby",
        eta: "Ready",
        color: "#22c55e",
      },
      {
        id: "PEGA-003",
        status: "maintenance",
        battery: 45,
        temp: "N/A",
        location: "Service Hangar B",
        mission: "Scheduled Maintenance",
        eta: "16:00",
        color: "#f97316",
      },
      {
        id: "PEGA-004",
        status: "in-flight",
        battery: 72,
        temp: "4.1°C",
        location: "En route to Memorial Hermann",
        mission: "Standard - Blood Products",
        eta: "15:15",
        color: "#3b82f6",
      },
    ];

    const created = await Flight.insertMany(sampleFleet);
    res.json({ message: "Fleet seeded", count: created.length });
  } catch (err) {
    console.error("Error seeding fleet:", err);
    res.status(500).json({
      message: "Error seeding fleet",
      error: err.message,
      stack: err.stack,
    });
  }
});

export default router;
