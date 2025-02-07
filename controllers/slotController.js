const Location = require("../models/Location.js"); // Ensure the correct path
const City = require("../models/City.js");
const TimeSlot = require("../models/Slots.js"); // Assuming the TimeSlot model is in the models folder
const Theater = require("../models/Theater.js");

const createSlots = async (req, res) => {
  try {
    const { theater, startTime, endTime } = req.body;

    // Validate required fields
    if (!theater || !startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "Theater, startTime, and endTime are required." });
    }

    // Create a new TimeSlot instance
    const newTimeSlot = new TimeSlot({
      theater,
      startTime,
      endTime,
    });

    // Save the time slot to the database
    const savedTimeSlot = await newTimeSlot.save();

    // Send back the created time slot
    res.status(201).json(savedTimeSlot);
  } catch (error) {
    res.status(500).json({
      message: "Error creating time slot",
      error: error.message,
    });
  }
};

// Controller to get slots by theater ID
const getSlotsByTheaterId = async (req, res) => {
  try {
    const { theaterId } = req.params;
    const slots = await TimeSlot.find({ theater: theaterId });
    res.status(200).json(slots);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching slots", error: error.message });
  }
};
const getSlotsBySlotId = async (req, res) => {
  try {
    const { slotId } = req.params;

    // Find slots where the theater ID matches
    const slots = await TimeSlot.findById(slotId);

    // Return the slots
    res.status(200).json(slots);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching slots", error: error.message });
  }
};

// Controller to update a slot
const updateSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, unavailableDates } = req.body;

    // Find the slot by ID and update
    const updatedSlot = await TimeSlot.findByIdAndUpdate(
      id,
      {
        startTime,
        endTime,
        unavailableDates,
      },
      { new: true } // Return the updated document
    );

    if (!updatedSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    res.status(200).json(updatedSlot);
  } catch (error) {
    res.status(500).json({
      message: "Error updating time slot",
      error: error.message,
    });
  }
};

const updateUnavailableDates = async (req, res) => {
  try {
    const { id } = req.params; // Get the TimeSlot ID from the request parameters
    const { oldDate, newDate } = req.body; // Get the old and new dates from the request body

    if (!oldDate || !newDate) {
      return res
        .status(400)
        .json({ error: "Both oldDate and newDate are required" });
    }

    // Find the TimeSlot by ID
    const timeSlot = await TimeSlot.findById(id);

    if (!timeSlot) {
      return res.status(404).json({ error: "TimeSlot not found" });
    }

    // Update the unavailableDates array
    const updatedUnavailableDates = timeSlot.unavailableDates.filter(
      (date) => date !== oldDate
    ); // Remove the old date
    updatedUnavailableDates.push(newDate); // Add the new date

    // Save the updated unavailableDates back to the document
    timeSlot.unavailableDates = updatedUnavailableDates;
    await timeSlot.save();

    res
      .status(200)
      .json({ message: "Unavailable dates updated successfully", timeSlot });
  } catch (error) {
    console.error("Error updating unavailable dates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to delete a slot
const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the slot by ID and delete
    const deletedSlot = await TimeSlot.findByIdAndDelete(id);

    if (!deletedSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    res.status(200).json({ message: "Time slot deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting time slot",
      error: error.message,
    });
  }
};

const updateSlotUnavailableDates = async (req, res) => {
  try {
    const { id } = req.params;
    const { dateToBeAdded } = req.body;

    // Find the TimeSlot by ID
    const timeSlot = await TimeSlot.findById(id);
    if (!timeSlot) {
      return res.status(404).json({ message: "TimeSlot not found" });
    }

    let updatedUnavailableDates = [...timeSlot.unavailableDates];

    // Add dateToBeAdded if it's not already in the array
    if (dateToBeAdded && !updatedUnavailableDates.includes(dateToBeAdded)) {
      updatedUnavailableDates.push(dateToBeAdded);
    }

    // Update the TimeSlot in the database
    timeSlot.unavailableDates = updatedUnavailableDates;
    await timeSlot.save();

    res.status(200).json({ message: "Dates updated successfully", 
      timeSlot 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSpecificDateFromSlot = async (req, res) => {
  try {
    const { id } = req.params; // Document ID
    const { dateToDelete } = req.body; // Date to remove


    // Find the TimeSlot by ID
    const timeSlot = await TimeSlot.findById(id);
    if (!timeSlot) {
      return res.status(404).json({ message: "TimeSlot not found" });
    }

    // Filter out the date to delete
    const updatedUnavailableDates = timeSlot.unavailableDates.filter(
      (date) => date !== dateToDelete
    );

    // Update and save the document
    timeSlot.unavailableDates = updatedUnavailableDates;
    await timeSlot.save();

    res.status(200).json({ message: "Date deleted successfully", 
      timeSlot 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createSlots,
  getSlotsByTheaterId,
  getSlotsBySlotId,
  updateSlot,
  deleteSlot,
  updateUnavailableDates,
  updateSlotUnavailableDates,
  deleteSpecificDateFromSlot,
};
