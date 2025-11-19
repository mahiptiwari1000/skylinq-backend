import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import flightRoutes from "./routes/flightRoutes.js";
import fleetRoutes from "./routes/fleetRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import flightLogRoutes from "./routes/flightLogRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Pegasus backend API running 🚀"));

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

app.use("/api/flights", flightRoutes);
app.use("/api/fleet", fleetRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/logs", flightLogRoutes);
app.use("/api/requests/active", requestRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
