const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  unavailableDates: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("TimeSlot", timeSlotSchema);
