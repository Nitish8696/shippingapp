const express = require("express");
const router = express.Router();
const axios = require("axios");
const crypto = require("crypto");
const Booking = require("../models/Booking.js");
const cron = require("node-cron");
const TimeSlot = require("../models/Slots.js");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./VerifyToken.js");

router.post("/:id",verifyToken, async (req, res) => {
  try {
    const order = await Booking.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    const data = {
      merchantId: "M22MUSABFZOUZ",
      merchantTransactionId: order.transationId,
      merchantUserId: "MUID123",
      amount: order.bookingDetails.advancedPay * 100,
      redirectUrl: `https://thekingtown.com/success/${order.transationId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `https://event.drsmithf.inpro2.fcomet.com/api/payment/status/${order.transationId}`,
      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const key = "4f55bf79-e012-4c39-b8cb-f4310acc82a0";
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

    const options = {
      method: "post",
      url: URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        return res
          .status(200)
          .send(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        res.status(500).json({ msg: "An error occurred" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred" });
  }
});

router.post("/status/:txnId", async (req, res) => {
  const merchantId = "M22MUSABFZOUZ";
  const SALT_KEY = "4f55bf79-e012-4c39-b8cb-f4310acc82a0";
  const keyIndex = 1;
  const string = `/pg/v1/status/${merchantId}/${req.params.txnId}` + SALT_KEY;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;
  const options = {
    method: "get",
    url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${req.params.txnId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };
  try {
    const response = await axios.request(options);

    if (response.data.code === "PAYMENT_SUCCESS") {
        console.log("here is success")
      const booked = await Booking.findOne({
        transationId: response.data.data.merchantTransactionId,
      });
      let unavailableDates = await booked.selectedDate;
      if (typeof unavailableDates === "string") {
        unavailableDates = [unavailableDates]; // Wrap single date string in an array
      }
      // Fetch the existing time slot
      const timeSlot = await TimeSlot.findById(booked.selectedSlot);

      // Combine existing dates with new dates and remove duplicates
      const updatedDates = Array.from(
        new Set([...timeSlot.unavailableDates, ...unavailableDates])
      );

      // Update the unavailableDates in the database
      timeSlot.unavailableDates = updatedDates;
      await timeSlot.save();

      await Booking.updateOne(
        { transationId: response.data.data.merchantTransactionId },
        { $set: { status: "PAYMENT_SUCCESS" } }
      );
      res.redirect("https://thekingtown.com/success");
    } else if (response.data.code === "PAYMENT_ERROR") {
      await Booking.updateOne(
        { transationId: response.data.data.merchantTransactionId },
        { $set: { status: "PAYMENT_ERROR" } }
      );
      res.redirect("https://thekingtown.com/error");
    } else if (response.data.code === "PAYMENT_PENDING") {
      await Booking.updateOne(
        { transationId: response.data.data.merchantTransactionId },
        { $set: { status: "PAYMENT_PENDING" } }
      );
      res.redirect("https://thekingtown.com/pending");
    } else if (response.data.code === "INTERNAL_SERVER_ERROR") {
      await Booking.updateOne(
        { transationId: response.data.data.merchantTransactionId },
        { $set: { status: "INTERNAL_SERVER_ERROR" } }
      );
      res.redirect("https://thekingtown.com/pending");
    } else {
      await Booking.updateOne(
        { transationId: response.data.data.merchantTransactionId },
        { $set: { status: "PAYMENT_ERROR" } }
      );
      res.redirect("https://thekingtown.com/error");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

async function checkTransactionStatus(transactionId) {
  try {
    const merchantId = "M22MUSABFZOUZ";
    const SALT_KEY = "4f55bf79-e012-4c39-b8cb-f4310acc82a0";
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${transactionId}` + SALT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    const options = {
      method: "get",
      url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`,
      },
    };
    const response = await axios.request(options);
    return response.data.code;
  } catch (error) {
    console.error("Error checking transaction status:", error);
    return null;
  }
}

async function updateDocumentStatus() {
  try {
    // Retrieve documents with status "Pending payment"
    const pendingOrders = await Booking.find({
      status: { $in: ["PAYMENT_PENDING", "INTERNAL_SERVER_ERROR"] },
    });

    // Loop through retrieved documents
    if (pendingOrders.length > 0) {
      for (const order of pendingOrders) {
        const transationId = order.transationId;

        // Check transaction status using API
        const newStatus = await checkTransactionStatus(transationId);

        if (newStatus) {
          // Update document status
          await Booking.updateOne(
            { transationId: transationId },
            { $set: { status: newStatus } }
          );
          console.log(
            `Updated status for transaction ${transationId} to ${newStatus}`
          );
        } else {
          console.log(
            `Failed to update status for transaction ${transationId}`
          );
        }
      }
    }
  } catch (error) {
    console.error("Error updating document status:", error);
  }
}

cron.schedule("0 */3 * * *", async () => {
  console.log("Running task to update document status...");
  await updateDocumentStatus();
});

module.exports = router;
