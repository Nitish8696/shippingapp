const Contact = require("../models/Contact");

// Controller to handle creating a new contact (POST)
const createContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Create a new contact document
    const newContact = new Contact({
      name,
      phone,
      email,
      message,
    });

    // Save the contact to the database
    const savedContact = await newContact.save();

    // Send a success response with the saved contact
    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to handle fetching all contacts (GET)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    // Send a response with all contacts
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteContacts = async (req, res) => {
  try {
    const contacts = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).send("success");
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createContact, getContacts, deleteContacts };
