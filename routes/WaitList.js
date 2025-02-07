const express = require('express');
const router = express.Router();
const waitlistController = require('../controllers/waitlistController');

const {
    verifyTokenAndAuthorization,
    verifyToken,
    verifyTokenAndAdmin,
  } = require("./VerifyToken.js");

// Route to create a new waitlist entry
router.post('/create', waitlistController.createWaitlistEntry);

// Route to get all waitlist entries
router.get('/get', verifyTokenAndAdmin, waitlistController.getAllWaitlistEntries);

// Route to delete a waitlist entry by ID
router.delete('/delete/:id',verifyTokenAndAdmin, waitlistController.deleteWaitlistEntry);

module.exports = router;
