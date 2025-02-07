const City = require("../models/City.js");
const Location = require("../models/Location.js");
const mongoose = require("mongoose");

// Get all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a city by ID
const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new city
const createCity = async (req, res) => {
  const { name, image } = req.body;

  // Validate the required fields
  if (!name || !image) {
    return res.status(400).json({ message: "Name and image are required" });
  }

  const newCity = new City({
    name,
    image,
  });

  try {
    const savedCity = await newCity.save();
    res.status(201).json(savedCity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a city by ID
const updateCity = async (req, res) => {
  const { name, image } = req.body;

  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // Update the city's name and image if provided
    city.name = name || city.name;
    city.image = image || city.image;

    const updatedCity = await city.save();
    res.status(200).json(updatedCity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a city by ID
const deleteCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // Delete all locations under the city
    await Location.deleteMany({ city: city._id });

    // Delete the city
    await City.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "City and associated locations deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get cities with corresponding locations
const getCitiesWithLocations = async (req, res) => {
  // console.log('jaat')
  try {
    const citiesWithLocations = await City.aggregate([
      {
        $lookup: {
          from: "locations", // collection to join
          localField: "_id", // field from the City model
          foreignField: "city", // field from the Location model
          as: "locations", // output array field
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          image: 1,
          locations: {
            _id: 1,
            name: 1,
            Address: 1,
            AddressLink: 1,
            GoogleLink: 1,
            Menu: 1,
          },
        },
      },
    ]);

    res.status(200).json(citiesWithLocations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// get specific city with locations
const getCityWithLocations = async (req, res) => {
  const { cityId } = req.params;

  try {
    const cityWithLocations = await City.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(cityId) }, // Match specific city by its ObjectId
      },
      {
        $lookup: {
          from: "locations", // Collection name of the locations
          localField: "_id", // Local field in City model
          foreignField: "city", // Foreign field in Location model
          as: "locations", // Result array name
        },
      },
    ]);

    console.log(cityWithLocations);

    if (cityWithLocations.length === 0) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json(cityWithLocations[0]); // Return the first (and only) result
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
  getCitiesWithLocations,
  getCityWithLocations,
};
