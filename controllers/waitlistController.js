const Waitlist = require('../models/WaitlistSchema');

// Create a new waitlist entry
exports.createWaitlistEntry = async (req, res) => {
  try {
    const newEntry = new Waitlist(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error creating waitlist entry', error });
  }
};

// Get all waitlist entries
exports.getAllWaitlistEntries = async (req, res) => {
  try {
    const waitlistEntries = await Waitlist.find();
    res.status(200).json(waitlistEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching waitlist entries', error });
  }
};

// Delete a waitlist entry by ID
exports.deleteWaitlistEntry = async (req, res) => {
  try {
    const deletedEntry = await Waitlist.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Waitlist entry not found' });
    }
    res.status(200).json({ message: 'Waitlist entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting waitlist entry', error });
  }
};
