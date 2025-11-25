// routes/requestRoutes.js
import express from "express";
import {
  getActiveRequests,
  getRequestsSummary,
  seedRequests,
  createRequest,       
} from "../controllers/requestController.js";

const router = express.Router();

// Active cards on Terminal Requests screen
router.get("/active", getActiveRequests);

// Right-hand “Live Visibility” panel (active deliveries, ETA, success rate, recent updates)
router.get("/summary", getRequestsSummary);

// Dev-only: seed demo data
router.post("/seed", seedRequests);

router.post("/create", createRequest);


export default router;
