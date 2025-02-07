const express = require('express');
const {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  getLocationsByCityId
} = require('../controllers/locationController.js');  // Ensure the correct path
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./VerifyToken.js");

const router = express.Router();

// Route to create a location
router.post('/locations',verifyTokenAndAdmin, createLocation);

// Route to get all locations
router.get('/locations', getAllLocations);

// Route to get a location by ID
router.get('/locations/:id', getLocationById);

// Route to update a location
router.put('/locations/:id',verifyTokenAndAdmin, updateLocation);

// Route to delete a location
router.delete('/locations/:id',verifyTokenAndAdmin, deleteLocation);

// Route to get locations by city ID
router.get('/locations/by-city/:cityId', getLocationsByCityId);

module.exports = router;
