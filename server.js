import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import flightRoutes from "./routes/flightRoutes.js";
import fleetRoutes from "./routes/fleetRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Pegasus backend API running 🚀"));

app.use("/api/flights", flightRoutes);
app.use("/api/fleet", fleetRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/emergency", emergencyRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
