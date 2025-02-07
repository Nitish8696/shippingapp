const express = require("express");

const {addDecor,
    getDecor,
    updateDecor,
    deleteDecor,
    getSingleDecor,} = require("../controllers/extraDecorationController.js")

const {
    verifyTokenAndAuthorization,
    verifyToken,
    verifyTokenAndAdmin,
  } = require("./VerifyToken.js");

  const router = express.Router();

  router.post('/decor',verifyTokenAndAdmin, addDecor)
  router.get('/decor', getDecor)
  router.get('/decor/:id', getSingleDecor)
  router.put('/decor/:id', verifyTokenAndAdmin, updateDecor)
  router.delete('/decor/:id', verifyTokenAndAdmin, deleteDecor)

  module.exports = router;


