import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import flightRoutes from "./routes/flightRoutes.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Pegasus backend API running 🚀"));

app.use("/api/flights", flightRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
