const express = require("express");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./VerifyToken.js");
const {
  createTheater,
  getAllTheatersWithSlots,
  getTheater,
  updateTheater,
  deleteTheater,
  getAllTheaters,
  getTheaterWithName
} = require("../controllers/theaterController.js");

const router = express.Router();

// Route to fetch theaters with their corresponding time slots
router.get("/theaters/with/slots/:locationId", getAllTheatersWithSlots);

router.get("/theaters", getAllTheaters);

router.get('/theater',getTheaterWithName);

router.post("/theaters",verifyTokenAndAdmin, createTheater);

// Get a specific theater by ID
router.get("/theaters/:id", getTheater);

// Update a theater by ID
router.put("/theaters/:id",verifyTokenAndAdmin, updateTheater);

// Delete a theater by ID
router.delete("/theaters/:id",verifyTokenAndAdmin, deleteTheater);

module.exports = router;
