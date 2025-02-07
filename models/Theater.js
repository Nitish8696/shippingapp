const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    default: 'null'
  },
  image: [String],
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  extraPersonCharge: {
    type: Number,
  },
  screenSize: {
    type: String,
  },
  speakerPower: {
    type: String,
  },
  decorationPrice: {
    type: Number,
  },
  features: {
    type: [String],
    default: [
      "Add cakes and gifts in next step",
      "Food can be ordered at the theater",
    ],
  },
  cancellationPolicy: {
    type: String,
  },
});

module.exports = mongoose.model("Theater", theaterSchema);
