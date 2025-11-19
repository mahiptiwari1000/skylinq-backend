import FlightLog from "../models/FlightLog.js";

export const getAllLogs = async (req, res) => {
  try {
    const logs = await FlightLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs", err });
  }
};

export const seedLogs = async (req, res) => {
  try {
    await FlightLog.deleteMany();

    const logs = [
      {
        timestamp: "2024-01-15 14:32:15",
        event: "Pickup Completed",
        flightId: "PEGA-001",
        location: "Houston Methodist Hospital",
        status: "completed",
        priority: "STAT",
        temp: "2.8°C",
      },
      {
        timestamp: "2024-01-15 14:28:45",
        event: "CoC Scan Verification",
        flightId: "PEGA-001",
        location: "Houston Methodist Hospital",
        status: "completed",
        priority: "STAT",
        temp: "3.1°C",
      },
      {
        timestamp: "2024-01-15 14:15:30",
        event: "Flight Departure",
        flightId: "PEGA-001",
        location: "PEGA Base - Houston",
        status: "completed",
        priority: "STAT",
        temp: "N/A",
      },
      {
        timestamp: "2024-01-15 14:10:12",
        event: "Weather Delay",
        flightId: "PEGA-001",
        location: "PEGA Base - Houston",
        status: "resolved",
        priority: "STAT",
        temp: "N/A",
      },
      {
        timestamp: "2024-01-15 13:45:20",
        event: "Pre-flight Check",
        flightId: "PEGA-001",
        location: "PEGA Base - Houston",
        status: "completed",
        priority: "STAT",
        temp: "N/A",
      },
      {
        timestamp: "2024-01-15 12:58:45",
        event: "Delivery Completed",
        flightId: "PEGA-002",
        location: "MD Anderson Cancer Center",
        status: "completed",
        priority: "Standard",
        temp: "4.2°C",
      },
      {
        timestamp: "2024-01-15 12:15:30",
        event: "Cold Chain Alert",
        flightId: "PEGA-002",
        location: "In-flight to MD Anderson",
        status: "resolved",
        priority: "Standard",
        temp: "6.8°C → 4.2°C",
      },
    ];

    await FlightLog.insertMany(logs);

    res.json({ message: "Flight logs seeded", count: logs.length });
  } catch (err) {
    res.status(500).json({ message: "Seeding failed", err });
  }
};
