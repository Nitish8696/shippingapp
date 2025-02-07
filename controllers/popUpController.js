const PopUp = require("../models/PopUp.js");

const addPopUp = async (req, res) => {
  try {
    const newPopUp = new PopUp(req.body);
    const savedPopUp = await newPopUp.save();
    res.status(201).json(savedPopUp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePopUp = async (req, res) => {
  try {
    const updatedPopUp = await PopUp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPopUp)
      return res.status(404).json({ message: "Cake not found" });
    res.status(200).json(updatedPopUp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSinglePopUp = async (req, res) => {
  try {
    const popUp = await PopUp.findById(req.params.id);
    if (!popUp) return res.status(404).json({ message: "Cake not found" });
    res.status(200).json(popUp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPopUp,
  updatePopUp,
  getSinglePopUp,
};
