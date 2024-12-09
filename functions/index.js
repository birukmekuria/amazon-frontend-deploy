const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

// Create Payment Intent
app.post("/payment/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total || req.body.total);

    // Validate total
    if (!total || total <= 0) {
      logger.warn("Invalid total received:", total);
      return res.status(400).json({ message: "Total must be greater than 0" });
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // Total in smallest currency unit
      currency: "usd",
    });

    logger.info("Payment Intent created:", paymentIntent.id);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    logger.error("Error creating Payment Intent:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Export the Firebase Function
exports.api = onRequest(app);
