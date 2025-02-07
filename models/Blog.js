const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Places and Activities",
      "Movies and Shows",
      "Celebration Ideas"
    ],
    default: null,
  },
  shortDiscription: {
    type: String,
  },
  imageOneHeading: {
    type: String,
  },
  imageOne: {
    type: String,
  },
  imageOneShortDesc: {
    type: String,
  },
  imageOneSourceLink: {
    type: String,
  },
  imageTwoHeading: {
    type: String,
  },
  imageTwo: {
    type: String,
  },
  imageTwoShortDesc: {
    type: String,
  },
  imageTwoSourceLink: {
    type: String,
  },
  imageThreeHeading: {
    type: String,
  },
  imageThree: {
    type: String,
  },
  imageThreeShortDesc: {
    type: String,
  },
  imageThreeSourceLink: {
    type: String,
  },
  imageFourHeading: {
    type: String,
  },
  imageFour: {
    type: String,
  },
  imageFourShortDesc: {
    type: String,
  },
  imageFourSourceLink: {
    type: String,
  },
  imageFiveHeading: {
    type: String,
  },
  imageFive: {
    type: String,
  },
  imageFiveShortDesc: {
    type: String,
  },
  imageFiveSourceLink: {
    type: String,
  },
  imageSixHeading: {
    type: String,
  },
  imageSix: {
    type: String,
  },
  imageSixShortDesc: {
    type: String,
  },
  imageSixSourceLink: {
    type: String,
  },
  imageSevenHeading: {
    type: String,
  },
  imageSeven: {
    type: String,
  },
  imageSevenShortDesc: {
    type: String,
  },
  imageSevenSourceLink: {
    type: String,
  },
  imageEightHeading: {
    type: String,
  },
  imageEight: {
    type: String,
  },
  imageEightShortDesc: {
    type: String,
  },
  imageEightSourceLink: {
    type: String,
  },
  imageNineHeading: {
    type: String,
  },
  imageNine: {
    type: String,
  },
  imageNineShortDesc: {
    type: String,
  },
  imageNineSourceLink: {
    type: String,
  },
  imageTenHeading: {
    type: String,
  },
  imageTen: {
    type: String,
  },
  imageTenShortDesc: {
    type: String,
  },
  imageTenSourceLink: {
    type: String,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
