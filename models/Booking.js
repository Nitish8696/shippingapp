const mongoose = require("mongoose");

const bookingDetailsSchema = new mongoose.Schema({
  bookingName: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  decoration: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  numOfPeople: {
    type: Number,
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  advancedPay: {
    type: Number,
    required: true,
  },
  balanceAmount: {
    type: Number,
    required: true,
  },
  decorationPrice: {
    type: Number,
    required: true,
  },
});

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  theater: {
    type: String,
    required: true,
  },
  theatersWithSlots: {
    type: Array,
    required: true,
  },
  selectedSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimeSlot",
    required: true,
  },
  selectedLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  selectedDate: {
    type: String,
    required: true,
  },
  bookingDetails: {
    type: bookingDetailsSchema,
    required: true,
  },
  nickname: {
    type: String,
    default: null,
  },
  selectedOccasion: {
    type: String,
  },
  selectedCakes: [
    {
      name: String,
      price: Number,
    },
  ],
  selectedDecorations: [
    {
      name: String,
      price: Number,
    },
  ],
  partnerNickname: {
    type: String,
    default: null,
  },
  transationId: { type: String, required: true },
  status: {
    type: String,
    enum: [
      "PAYMENT NOT INITIALIZED",
      "PAYMENT_PENDING",
      "PAYMENT_SUCCESS",
      "PAYMENT_ERROR",
      "INTERNAL_SERVER_ERROR",
    ],
    default: "PAYMENT NOT INITIALIZED",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
