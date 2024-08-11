const express = require("express");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use environment variable for Stripe key
const User = require("./models/User");
require("dotenv").config();
const path = require("path");

const app = express();

require("./middleware/auth");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/products", require("./routes/producRoutes"));
app.use("/api/auth", require("./routes/useRoutes"));

app.post("/api/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));
