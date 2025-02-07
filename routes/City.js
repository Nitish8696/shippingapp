const express = require('express');
const {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
  getCitiesWithLocations,
  getCityWithLocations
} = require('../controllers/cityController.js');
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./VerifyToken.js");

const router = express.Router();

// GET all cities
router.get('/', getAllCities);

// GET a city by ID
router.get('/:id', getCityById);

// POST a new city
router.post('/',verifyTokenAndAdmin, createCity);

// PUT (update) an existing city by ID
router.put('/:id',verifyTokenAndAdmin, updateCity);

// DELETE a city by ID
router.delete('/:id',verifyTokenAndAdmin, deleteCity);

// Route to fetch cities with their corresponding locations
router.get('/cities/with/locations', getCitiesWithLocations);

// Route to get a specific city with corresponding locations
router.get('/city/with/locations/:cityId', getCityWithLocations);

module.exports = router;
