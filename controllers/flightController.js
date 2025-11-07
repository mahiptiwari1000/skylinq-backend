import Flight from "../models/Flight.js";

/**
 * @desc   Get all flights
 * @route  GET /api/flights
 * @access Public (or secure later with auth)
 */
export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    res.status(500).json({ message: "Server error while fetching flights" });
  }
};

/**
 * @desc   Add a new flight
 * @route  POST /api/flights
 * @access Public (or secure later with auth)
 */
export const addFlight = async (req, res) => {
  try {
    const { flightId, status, eta, temperature } = req.body;

    if (!flightId || !status) {
      return res
        .status(400)
        .json({ message: "Flight ID and status are required" });
    }

    const newFlight = new Flight({ flightId, status, eta, temperature });
    await newFlight.save();

    res.status(201).json({
      message: "Flight added successfully",
      flight: newFlight,
    });
  } catch (error) {
    console.error("Error adding flight:", error.message);
    res.status(500).json({ message: "Server error while adding flight" });
  }
};
