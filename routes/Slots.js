const express = require("express");
const TimeSlot = require("../models/Slots.js"); // Assuming the TimeSlot model is in the models folder
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./VerifyToken.js");

const {
  createSlots,
  updateSlot,
  deleteSlot,
  getSlotsByTheaterId,
  getSlotsBySlotId,
  updateUnavailableDates,
  updateSlotUnavailableDates,
  deleteSpecificDateFromSlot
} = require("../controllers/slotController.js");

const router = express.Router();

// Route for creating a new time slot
router.post("/timeslots",verifyTokenAndAdmin, createSlots);

// Route to update a slot
router.put("/timeslot/:id",verifyTokenAndAdmin, updateSlot);

// route for udating unavable date
router.put("/:id",verifyTokenAndAdmin, updateUnavailableDates);

// route for updating
router.put("/update-dates/:id",verifyTokenAndAdmin, updateSlotUnavailableDates);

router.put("/delete-date/:id",verifyTokenAndAdmin, deleteSpecificDateFromSlot);

// Route for getting a single slot by ID
router.get("/timeslot/single/:slotId", getSlotsBySlotId);

// Route to delete a slot
router.delete("/timeslot/:id",verifyTokenAndAdmin, deleteSlot);

// Route to get all slots by theater ID
router.get("/timeslot/:theaterId", getSlotsByTheaterId);

module.exports = router;
