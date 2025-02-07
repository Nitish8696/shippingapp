const mongoose = require("mongoose");

const popUpSchema = new mongoose.Schema({
    popUp: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("PopUp", popUpSchema);