// Import necessary libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const {MONGOURI} = require("./key.js");
const cors = require('cors');



// Initialize the Express app
const app = express();
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Define MongoDB connection string from environment variables
// const dbURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGOURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

  // Routes
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const planRoutes = require("./routes/planRoutes");
const contentRoutes = require("./routes/contentRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// Handle errors (if any)
// const errorHandler = require("./utils/errorHandler");
// app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


