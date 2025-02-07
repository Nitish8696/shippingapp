const ExtraDecoration = require("../models/ExtraDecoration.js");

const addDecor = async (req, res) => {
  try {
    const newDecor = new ExtraDecoration(req.body);
    const savedDecor = await newDecor.save();
    res.status(201).json(savedDecor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDecor = async (req, res) => {
  try {
    const decor = await ExtraDecoration.find();
    res.status(200).json(decor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDecor = async (req, res) => {
  try {
    const updatedDecor = await ExtraDecoration.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDecor)
      return res.status(404).json({ message: "Cake not found" });
    res.status(200).json(updatedDecor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDecor = async (req, res) => {
  try {
    const deletedDecor = await ExtraDecoration.findByIdAndDelete(req.params.id);
    if (!deletedDecor)
      return res.status(404).json({ message: "Cake not found" });
    res.status(200).json({ message: "Cake deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleDecor = async (req, res) => {
  try {
    const decor = await ExtraDecoration.findById(req.params.id);
    if (!decor) return res.status(404).json({ message: "Cake not found" });
    res.status(200).json(decor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addDecor,
  getDecor,
  updateDecor,
  deleteDecor,
  getSingleDecor,
};
