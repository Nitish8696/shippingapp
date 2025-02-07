const Location = require('../models/Location.js');
const City = require('../models/City.js');

// Create a new location
const createLocation = async (req, res) => {
  try {
    const { name, city, Address, AddressLink, GoogleLink, Menu } = req.body;

    // Check if the city exists
    const existingCity = await City.findById(city);
    if (!existingCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    const newLocation = new Location({ name, city, Address, AddressLink, GoogleLink, Menu });
    await newLocation.save();

    res.status(201).json({ message: 'Location created successfully', location: newLocation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all locations
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate('city', 'name');
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single location by ID
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate('city', 'name');
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a location
const updateLocation = async (req, res) => {
  try {
    const { name, city, Address, AddressLink, GoogleLink, Menu } = req.body;

    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      { name, city, Address, AddressLink, GoogleLink, Menu },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json({ message: 'Location updated successfully', location: updatedLocation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a location
const deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);
    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to fetch locations by city ID
const getLocationsByCityId = async (req, res) => {
  try {
    const cityId = req.params.cityId; // Get city ID from URL params

    // Find all locations with the matching city ID
    const locations = await Location.find({ city: cityId });

    // If no locations found
    if (!locations.length) {
      return res.status(404).json({ message: "No locations found for this city." });
    }

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation,
    getLocationsByCityId,
}