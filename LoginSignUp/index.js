const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
// Middleware
const bodyParser = require("body-parser");
const routes = require("./routes");
app.use(bodyParser.json());
// app.use(express.json()); // To parse JSON payloads
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded payloads
app.use("/api/v1", routes);
// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Connected to the loginSignup database");
    // Define port
    const PORT = process.env.PORT || 3000;

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to the database", err);
    process.exit(1); // Exit process with failure
  }
}

connectDB();
