const Cake = require("../models/Cake.js");

const addCake = async (req, res) => {
  try {
    const newCake = new Cake(req.body);
    const savedCake = await newCake.save();
    res.status(201).json(savedCake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCake = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.status(200).json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCake = async (req, res) => {
  try {
    const updatedCake = await Cake.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCake)
      return res.status(404).json({ message: "Cake not found" });
    res.status(200).json(updatedCake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCake = async (req, res) => {
  try {
    const deletedCake = await Cake.findByIdAndDelete(req.params.id);
    if (!deletedCake)
      return res.status(404).json({ message: "Cake not found" });
    res.status(200).json({ message: "Cake deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSingleCake = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    res.status(200).json(cake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCake,
  getCake,
  updateCake,
  deleteCake,
  getSingleCake,
};
