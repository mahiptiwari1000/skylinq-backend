import express from "express";
import {
  getAllLogs,
  seedLogs
} from "../controllers/flightLogController.js";

const router = express.Router();

router.get("/", getAllLogs);
router.post("/seed", seedLogs);

export default router;
