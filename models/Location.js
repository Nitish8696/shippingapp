const mongoose = require("mongoose");

const loactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  AddressLink: {
    type: String,
    required: true,
  },
  GoogleLink: {
    type: String,
    required: true,
  },
  Menu: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Location", loactionSchema);
