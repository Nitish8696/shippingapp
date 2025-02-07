const express = require("express");

const {addGift,
    getGift,
    updateGift,
    deleteGift,
    getSingleGift,} = require("../controllers/giftController.js")

const {
    verifyTokenAndAuthorization,
    verifyToken,
    verifyTokenAndAdmin,
  } = require("./VerifyToken.js");

  const router = express.Router();

  router.post('/gift',verifyTokenAndAdmin, addGift)
  router.get('/gift', getGift)
  router.get('/gift/:id', getSingleGift)
  router.put('/gift/:id', verifyTokenAndAdmin, updateGift)
  router.delete('/gift/:id', verifyTokenAndAdmin, deleteGift)

  module.exports = router;


