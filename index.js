const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "*", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// http://localhost:5174
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }
};

//routes import
const theaterRoute = require("./routes/Theater.js");
const sloteRoute = require("./routes/Slots.js");
const cityRoute = require("./routes/City.js");
const locationRoute = require("./routes/Location.js");
const authRoute = require("./routes/Auth.js");
const userRoute = require("./routes/User.js");
const bookingRoute = require("./routes/Booking.js");
const paymentRoute = require("./routes/Payment.js");
const blogRoute = require("./routes/Blog.js");
const contactRoute = require('./routes/Contact.js')
const waitlistRoute = require('./routes/WaitList.js')
const cakeRoute = require('./routes/Cake.js');
const decorRoute = require('./routes/ExtraDecoration.js');
const giftRoute = require('./routes/Gift.js');
const popRoute = require('./routes/PopUp.js');
const serviceRoute = require('./routes/Service.js');

app.use("/api/theater", theaterRoute);
app.use("/api/slote", sloteRoute);
app.use("/api/cities", cityRoute);
app.use("/api/location", locationRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/blog", blogRoute);
app.use("/api/contact", contactRoute);
app.use("/api/waitlist", waitlistRoute);
app.use("/api/cake", cakeRoute);
app.use("/api/decor", decorRoute);
app.use("/api/gift", giftRoute);
app.use("/api/service", serviceRoute);
app.use("/api/popup", popRoute);

connect().then(() => {
  app.listen(9000, () => {
    console.log("Connected to backend");
  });
});
