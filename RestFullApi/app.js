const express = require("express");
const app = express();

app.use(express.json());

require("./src/database/conn");

const mongoose = require("mongoose");
const Student = require("./src/models/students");

const studentRouter = require("./src/routers/studentroute");
app.use(studentRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
