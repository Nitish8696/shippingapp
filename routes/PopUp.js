const express = require("express");

const {addPopUp,
    updatePopUp,
    getSinglePopUp,} = require("../controllers/popUpController.js")

const {
    verifyTokenAndAdmin,
  } = require("./VerifyToken.js");

  const router = express.Router();

  router.post('/popup',verifyTokenAndAdmin, addPopUp)
  router.get('/popup/:id', getSinglePopUp)
  router.put('/popup/:id', verifyTokenAndAdmin, updatePopUp)

  module.exports = router;


