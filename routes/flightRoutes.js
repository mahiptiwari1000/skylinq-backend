import express from "express";
import { getFlights, addFlight } from "../controllers/flightController.js";

const router = express.Router();
router.get("/", getFlights);
router.post("/", addFlight);
export default router;
