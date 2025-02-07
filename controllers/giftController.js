const Gift = require("../models/Gift.js");

const addGift = async (req, res) => {
  try {
    const newGift = new Gift(req.body);
    const savedGift = await newGift.save();
    res.status(201).json(savedGift);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getGift = async (req, res) => {
  try {
    const gift = await Gift.find();
    res.status(200).json(gift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGift = async (req, res) => {
  try {
    const updatedGift = await Gift.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedGift)
      return res.status(404).json({ message: "Cake not found" });
    res.status(200).json(updatedGift);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGift = async (req, res) => {
  try {
    const deletedGift = await Gift.findByIdAndDelete(req.params.id);
    if (!deletedGift)
      return res.status(404).json({ message: "Cake not found" });
    res.status(200).json({ message: "Cake deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleGift = async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) return res.status(404).json({ message: "Cake not found" });
    res.status(200).json(gift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addGift,
  getGift,
  updateGift,
  deleteGift,
  getSingleGift,
};
