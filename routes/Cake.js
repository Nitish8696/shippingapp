const express = require("express");

const {addCake,
    getCake,
    updateCake,
    getSingleCake,
    deleteCake} = require("../controllers/cakeController.js")

const {
    verifyTokenAndAuthorization,
    verifyToken,
    verifyTokenAndAdmin,
  } = require("./VerifyToken.js");

  const router = express.Router();

  router.post('/cake',verifyTokenAndAdmin, addCake)
  router.get('/cake', getCake)
  router.get('/cake/:id', getSingleCake)
  router.put('/cake/:id', verifyTokenAndAdmin, updateCake)
  router.delete('/cake/:id', verifyTokenAndAdmin, deleteCake)

  module.exports = router;


