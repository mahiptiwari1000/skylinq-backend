// controllers/requestController.js
import Request from "../models/Request.js";

// GET /api/requests
export const getActiveRequests = async (req, res) => {
  try {
    const active = await Request.find({
      status: { $in: ["in-transit", "pending"] },
    }).sort({ createdAt: -1 });

    res.json(active);
  } catch (err) {
    console.error("Error fetching active requests:", err);
    res
      .status(500)
      .json({ message: "Error fetching active requests", error: err.message });
  }
};

// GET /api/requests/summary
export const getRequestsSummary = async (req, res) => {
  try {
    const requests = await Request.find();

    const total = requests.length || 1;

    const activeDeliveries = requests.filter((r) =>
      ["in-transit", "pending"].includes(r.status)
    ).length;

    const completed = requests.filter((r) => r.status === "completed").length;

    const withEta = requests.filter(
      (r) => typeof r.etaMinutes === "number" && !Number.isNaN(r.etaMinutes)
    );
    const avgEtaMinutes =
      withEta.length > 0
        ? Math.round(
            withEta.reduce((sum, r) => sum + r.etaMinutes, 0) / withEta.length
          )
        : null;

    const successRate =
      requests.length === 0
        ? 0
        : Math.round(((completed / requests.length) * 1000)) / 10; // 1 decimal

    // Flatten updates across all requests
    const updates = [];
    for (const r of requests) {
      if (Array.isArray(r.updates)) {
        for (const u of r.updates) {
          updates.push({
            requestId: r.requestId,
            message: u.message,
            type: u.type || "info",
            createdAt: u.createdAt || r.updatedAt || r.createdAt,
          });
        }
      }
    }

    updates.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const recentUpdates = updates.slice(0, 3);

    res.json({
      activeDeliveries,
      averageEtaMinutes: avgEtaMinutes,
      successRate,
      recentUpdates,
    });
  } catch (err) {
    console.error("Error computing requests summary:", err);
    res.status(500).json({
      message: "Error computing requests summary",
      error: err.message,
    });
  }
};

// POST /api/requests/seed  (one-time dev seed)
export const seedRequests = async (req, res) => {
  try {
    await Request.deleteMany();

    const now = new Date();

    const data = [
      {
        requestId: "REQ-001",
        priority: "STAT",
        tags: ["STAT", "Critical"],
        status: "in-transit",
        fromHospital: "Houston Methodist Hospital",
        toHospital: "MD Anderson Cancer Center",
        cargo: "Heart - Transplant",
        progress: 92,
        eta: "14:32",
        etaMinutes: 18,
        temp: "2.8°C",
        updates: [
          {
            message: "REQ-001 – 5 min to destination",
            type: "info",
            createdAt: new Date(now.getTime() - 5 * 60 * 1000),
          },
        ],
      },
      {
        requestId: "REQ-002",
        priority: "Standard",
        tags: ["CoC", "Standard"],
        status: "pending",
        fromHospital: "Texas Children's Hospital",
        toHospital: "Baylor St. Luke's",
        cargo: "Blood Products",
        progress: 25,
        eta: "—",
        etaMinutes: null,
        temp: "—",
        updates: [
          {
            message: "REQ-002 – Awaiting pickup",
            type: "warning",
            createdAt: new Date(now.getTime() - 20 * 60 * 1000),
          },
        ],
      },
      {
        requestId: "REQ-003",
        priority: "Standard",
        tags: ["Standard"],
        status: "completed",
        fromHospital: "Houston Methodist Hospital",
        toHospital: "MD Anderson Cancer Center",
        cargo: "Blood Products",
        progress: 100,
        eta: "13:58",
        etaMinutes: 15,
        temp: "4.0°C",
        updates: [
          {
            message: "REQ-003 – Delivery completed",
            type: "success",
            createdAt: new Date(now.getTime() - 40 * 60 * 1000),
          },
        ],
      },
    ];

    const created = await Request.insertMany(data);
    res.json({ message: "Requests seeded", count: created.length });
  } catch (err) {
    console.error("Error seeding requests:", err);
    res
      .status(500)
      .json({ message: "Error seeding requests", error: err.message });
  }
};

export const createRequest = async (req, res) => {
  try {
    const {
      requestId,
      priority,
      tags,
      status,
      fromHospital,
      toHospital,
      cargo,
      progress,
      eta,
      etaMinutes,
      temp,
    } = req.body;

    const created = await Request.create({
      requestId,
      priority,
      tags,
      status,
      fromHospital,
      toHospital,
      cargo,
      progress,
      eta,
      etaMinutes,
      temp,
      updates: [
        {
          message: `${requestId} created`,
          type: "info",
          createdAt: new Date(),
        },
      ],
    });

    res.json({ message: "Request created", request: created });
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({
      message: "Error creating request",
      error: err.message,
    });
  }
};
