const express = require("express");

const {
  addService,
  getService,
  updateService,
  deleteService,
  getSingleService,
} = require("../controllers/serviceController.js");

const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./VerifyToken.js");

const router = express.Router();

router.post("/service", verifyTokenAndAdmin, addService);
router.get("/service", getService);
router.get("/service/:id", getSingleService);
router.put("/service/:id", verifyTokenAndAdmin, updateService);
router.delete("/service/:id", verifyTokenAndAdmin, deleteService);

module.exports = router;
