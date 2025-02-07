const Booking = require("../models/Booking.js");

// Controller to create a new booking
const createBooking = async (req, res) => {
  try {
    const {
      user,
      theater,
      theatersWithSlots,
      selectedSlot,
      selectedLocation,
      selectedDate,
      bookingDetails,
      nickname,
      selectedOccasion,
      selectedCakes,
      selectedDecorations,
      partnerNickname,
      transationId,
    } = req.body;

    // Create a new booking document
    const newBooking = new Booking({
      user,
      theater,
      selectedSlot,
      theatersWithSlots,
      selectedLocation,
      selectedDate,
      bookingDetails,
      nickname,
      selectedOccasion,
      selectedCakes,
      selectedDecorations,
      partnerNickname,
      transationId,
      status: "PAYMENT NOT INITIALIZED", // Initial status
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Return the saved booking as a response
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBooking = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Get page and limit from query params, with default values

    const bookings = await Booking.find({ status: "PAYMENT_SUCCESS" })
      .populate({ path: "user", select: "username" }) // Populate user field with username only
      .populate({ path: "selectedSlot", select: "startTime endTime" })
      .populate({ path: "selectedLocation", select: "name" })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get latest first
      .skip((page - 1) * limit) // Calculate how many documents to skip
      .limit(Number(limit)); // Limit the number of documents returned

    // Check if bookings exist
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found" });
    }

    // Get the total count of bookings
    const totalBookings = await Booking.countDocuments({
      status: "PAYMENT_SUCCESS",
    });

    res.json({
      bookings,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBookings / limit),
      totalBookings,
    });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleBooking = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Get page and limit from query params, with default values

  try {
    const bookings = await Booking.find({
      user: req.params.id,
      status: "PAYMENT_SUCCESS",
    })
      .populate({ path: "user", select: "username" }) // Populate user field with username only
      .populate({ path: "selectedSlot", select: "startTime endTime" })
      .populate({ path: "selectedLocation", select: "name" })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get latest first
      .skip((page - 1) * limit) // Calculate how many documents to skip
      .limit(Number(limit)); // Limit the number of documents returned

    if (!bookings || !bookings.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }
    const totalBookings = await Booking.countDocuments({
      user: req.params.id,
      status: "PAYMENT_SUCCESS",
    });

    res.json({
      bookings,
      currentPage: Number(page),
      totalPages: Math.ceil(totalBookings / limit),
      totalBookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const setBookingByTransaction = async (req, res) => {
  try {
    const bookings = await Booking.find({ transationId: req.params.id })
      .populate({ path: "user", select: "username" }) // Populate user field with username only
      .populate({ path: "selectedSlot", select: "startTime endTime" })
      .populate({ path: "selectedLocation", select: "name" });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBookingDate = async (req, res) => {
  try {
    const { id } = req.params; // Get the booking ID from the request parameters
    const { selectedDate } = req.body; // Get the new selectedDate from the request body

    if (!selectedDate) {
      return res.status(400).json({ error: "Selected date is required" });
    }

    // Find the booking by ID and update the selectedDate field
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { selectedDate },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Respond with the updated booking
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking date:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBookingName = async (req, res) => {
  try {
    const { id } = req.params; // Get the booking ID from the request parameters
    const { nickname, partnerNickname } = req.body; // Get the fields to update from the request body

    // Build the update object dynamically based on the provided fields
    const updateData = {};
    if (nickname) updateData.nickname = nickname;
    if (partnerNickname) updateData.partnerNickname = partnerNickname;

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update." });
    }

    // Update the booking in the database
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({
      message: "Booking updated successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

const updateBookingSlot = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, {
      selectedSlot,
    });
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    res.status(200).json({
      message: "Booking updated successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

const searchBookingByWhatsNumber = async (req, res) => {
  try {
    const { whatsappNumber } = req.query;

    // Validate query parameter
    if (!whatsappNumber) {
      return res
        .status(400)
        .json({ message: "Please provide a whatsappNumber to search." });
    }

    // Search for bookings with the provided whatsappNumber
    const bookings = await Booking.find({
      "bookingDetails.whatsappNumber": whatsappNumber,
      status: "PAYMENT_SUCCESS",
    })
      .populate({ path: "user", select: "username" }) // Populate user field with username only
      .populate({ path: "selectedSlot", select: "startTime endTime" })
      .populate({ path: "selectedLocation", select: "name" });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found." });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error searching bookings:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
const searchBookingByBookingName = async (req, res) => {
  try {
    const { BookingName } = req.query;

    // Validate query parameter
    if (!BookingName) {
      return res
        .status(400)
        .json({ message: "Please provide a booking name to search." });
    }

    // Search for bookings with the provided BookingName
    const bookings = await Booking.find({
      "bookingDetails.bookingName": new RegExp(BookingName, "i"), // Case-insensitive search
      status: "PAYMENT_SUCCESS",
    })
      .populate({ path: "user", select: "username" }) // Populate user field with username only
      .populate({ path: "selectedSlot", select: "startTime endTime" })
      .populate({ path: "selectedLocation", select: "name" });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found." });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error searching bookings:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
const searchBookingByBookingDate = async (req, res) => {
  try {
    const { BookingDate } = req.query;
    console.log(BookingDate);

    // Validate query parameter
    if (!BookingDate) {
      return res
        .status(400)
        .json({ message: "Please provide a booking name to search." });
    }

    // Search for bookings with the provided BookingName
    const bookings = await Booking.find({
      selectedDate: BookingDate, // Case-insensitive search
      status: "PAYMENT_SUCCESS",
    })
      .populate({ path: "user", select: "username" }) // Populate user field with username only
      .populate({ path: "selectedSlot", select: "startTime endTime" })
      .populate({ path: "selectedLocation", select: "name" });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found." });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error searching bookings:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateSlot = async (req, res) => {
  try {
    const { id } = req.params; // Booking document ID
    const { selectedSlot } = req.body; // New selectedSlot ID

    console.log(id, selectedSlot)

    if (!selectedSlot) {
      return res.status(400).json({ message: "selectedSlot is required" });
    }

    // Find and update the Booking document
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { selectedSlot },
      { new: true } // Return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "selectedSlot updated successfully",
         updatedBooking 
        });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
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
  updateSlot,
};
