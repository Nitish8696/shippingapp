const express = require("express");
const {
  createBooking,
  getBooking,
  getSingleBooking,
  setBookingByTransaction,
  updateBookingDate,
  updateBookingName,
  updateBookingSlot,
  searchBookingByWhatsNumber,
  searchBookingByBookingName,
  searchBookingByBookingDate,
  updateSlot
} = require("../controllers/bookingController.js");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./VerifyToken.js");

const router = express.Router();

router.get("/name/search",verifyTokenAndAdmin,searchBookingByBookingName);
router.get("/date/search",verifyTokenAndAdmin,searchBookingByBookingDate);
router.get("/search",verifyTokenAndAdmin,searchBookingByWhatsNumber);

// POST route to create a new booking
router.post("/", createBooking);
router.put("/update-slot/:id",updateSlot)
router.put("/name/:id", updateBookingName);
router.put("/:id", updateBookingDate);
router.get("/", verifyTokenAndAdmin, getBooking);
router.get("/:id", verifyToken, getSingleBooking);
router.get("/slot/:id", verifyToken, getSingleBooking);
router.get("/single/:id",verifyToken,setBookingByTransaction)


module.exports = router;
