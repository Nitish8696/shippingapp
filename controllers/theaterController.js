const Theater = require("../models/Theater.js")
const TimeSlot = require("../models/Slots.js")
const mongoose = require("mongoose");


const getAllTheatersWithSlots = async (req, res) => {
  const { locationId } = req.params;
  try {
    const theaters = await Theater.aggregate([
      {
        $match: { location: new mongoose.Types.ObjectId(locationId) }, // Match specific city by its ObjectId
      },
      {
        $lookup: {
          from: "timeslots", // Collection name in MongoDB (automatically pluralized to 'timeslots')
          localField: "_id", // The `_id` field in the `Theater` collection
          foreignField: "theater", // The `theater` field in the `TimeSlot` collection
          as: "timeSlots", // The field in which to store the joined time slots
        },
      },
    ]);

    res.status(200).json(theaters);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching theaters with slots", error });
  }
};

const getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find().populate("location");
    res.status(200).json(theaters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTheater = async (req, res) => {
  try {
    const {
      name,
      image,
      location,
      maxPeople,
      numberOfPeople,
      price,
      video,
      regularPrice,
      extraPersonCharge,
      screenSize,
      speakerPower,
      decorationPrice,
      features,
      cancellationPolicy,
    } = req.body;

    // Creating new theater document
    const newTheater = new Theater({
      name,
      image,
      location,
      maxPeople,
      numberOfPeople,
      price,
      video,
      regularPrice,
      extraPersonCharge,
      screenSize,
      speakerPower,
      decorationPrice,
      features,
      cancellationPolicy,
    });

    // Saving the new theater to the database
    await newTheater.save();

    res
      .status(201)
      .json({ message: "Theater created successfully", theater: newTheater });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// gettheater
const getTheater = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id).populate("location");
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json(theater);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update theater
const updateTheater = async (req, res) => {
  const {
    name,
    image,
    maxPeople,
    numberOfPeople,
    price,
    video,
    regularPrice,
    extraPersonCharge,
    screenSize,
    speakerPower,
    decorationPrice,
    features,
    cancellationPolicy,
  } = req.body;

  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    // Update theater fields
    theater.name = name || theater.name;
    theater.image = image || theater.image;
    theater.maxPeople = maxPeople || theater.maxPeople;
    theater.numberOfPeople = numberOfPeople || theater.numberOfPeople;
    theater.price = price || theater.price;
    theater.video = video || theater.video;
    theater.regularPrice = regularPrice || theater.regularPrice;
    theater.extraPersonCharge = extraPersonCharge || theater.extraPersonCharge;
    theater.screenSize = screenSize || theater.screenSize;
    theater.speakerPower = speakerPower || theater.speakerPower;
    theater.decorationPrice = decorationPrice || theater.decorationPrice;
    theater.features = features || theater.features;
    theater.cancellationPolicy =
      cancellationPolicy || theater.cancellationPolicy;

    await theater.save();
    res.status(200).json({ message: "Theater updated successfully", theater });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a theater by ID
const deleteTheater = async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    await Theater.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Theater deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTheaterWithName = async (req, res) => {
  const name = req.boby.getTheaterWithName
  try {
    const theater = await Theater.findOne({ name: name })
    if (!theater) {
      return res.status(404).json({ message: "Theater not found" });
    }
    res.status(200).json(theater);
  } catch (error) {
    return res.status(404).json({ message:error.message });
  }
}

module.exports = {
    getAllTheatersWithSlots,
    getAllTheaters,
    createTheater,
    getTheater,
    updateTheater,
    deleteTheater,
    getTheaterWithName
}
