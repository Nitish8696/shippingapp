const express = require('express');
const { createContact, getContacts,deleteContacts } = require('../controllers/contactController');
const {
    verifyTokenAndAuthorization,
    verifyToken,
    verifyTokenAndAdmin,
  } = require("./VerifyToken.js");

const router = express.Router();

// POST route to create a new contact
router.post('/', createContact);

// GET route to fetch all contacts
router.get('/',verifyTokenAndAdmin, getContacts);

// DELETE route to delete a specific contact by ID
router.delete('/:id',verifyTokenAndAdmin, deleteContacts);


module.exports = router;

