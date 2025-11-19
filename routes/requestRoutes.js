// routes/requestRoutes.js
import express from "express";
import {
  getActiveRequests,
  getRequestsSummary,
  seedRequests,
} from "../controllers/requestController.js";

const router = express.Router();

// Active cards on Terminal Requests screen
router.get("/active", getActiveRequests);

// Right-hand “Live Visibility” panel (active deliveries, ETA, success rate, recent updates)
router.get("/summary", getRequestsSummary);

// Dev-only: seed demo data
router.post("/seed", seedRequests);

export default router;
