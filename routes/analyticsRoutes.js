import express from "express";
const router = express.Router();

router.get("/mission-volume", (req, res) => {
  res.json([
    { month: "Jan", total: 40, stat: 12 },
    { month: "Feb", total: 52, stat: 5 },
    { month: "Mar", total: 48, stat: 10 },
    { month: "Apr", total: 61, stat: 18 },
    { month: "May", total: 55, stat: 14 },
    { month: "Jun", total: 68, stat: 21 },
  ]);
});

router.get("/mission-status", (req, res) => {
  res.json([
    { label: "Completed", value: 234 },
    { label: "In Progress", value: 12 },
    { label: "Delayed", value: 3 },
    { label: "Cancelled", value: 1 },
  ]);
});

export default router;
