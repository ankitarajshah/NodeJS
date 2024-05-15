const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const users = [];

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Validate email address
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone number
function validatePhone(phone) {
  const re = /^\d{10}$/;
  return re.test(phone);
}

// Read (GET): View a list of users
app.get("/", (req, res) => {
  res.render("index", { pageTitle: "Add User" });
});

// Create (POST): Add a new user
app.post("/add-user", (req, res) => {
  const { fullname, email, phone } = req.body;

  // Basic validations
  if (!fullname || !email || !phone) {
    console.error("Required fields missing");
    res.status(400).send("All fields are required");
    return;
  }

  if (!validateEmail(email)) {
    console.error("Invalid email address");
    res.status(400).send("Invalid email address");
    return;
  }

  if (!validatePhone(phone)) {
    console.error("Invalid phone number");
    res.status(400).send("Invalid phone number");
    return;
  }

  // Add the user to the users array
  users.push({ id: Date.now(), fullname, email, phone });

  console.log("Users after adding:", users); // Log users array to check if user is added

  res.redirect("/users");
});

// Read (GET): View a list of users
app.get("/users", (req, res) => {
  res.render("users", { pageTitle: "Users", users });
});

// Update (GET): Display the user edit form
app.get("/edit-user/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id === parseInt(userId));

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  res.render("edit-user", { pageTitle: "Edit User", user });
});

// Update (POST): Update user information
app.post("/edit-user/:id", (req, res) => {
  const userId = req.params.id;
  const { fullname, email, phone } = req.body;

  if (!fullname || !email || !phone) {
    console.error("Required fields missing");
    res.status(400).send("All fields are required");
    return;
  }

  if (!validateEmail(email)) {
    console.error("Invalid email address");
    res.status(400).send("Invalid email address");
    return;
  }

  if (!validatePhone(phone)) {
    console.error("Invalid phone number");
    res.status(400).send("Invalid phone number");
    return;
  }

  const userIndex = users.findIndex((user) => user.id === parseInt(userId));

  if (userIndex === -1) {
    res.status(404).send("User not found");
    return;
  }

  users[userIndex] = { id: userId, fullname, email, phone };

  console.log("Updated user:", users[userIndex]);

  res.redirect("/users");
});

// Delete (POST): Remove a user
app.post("/delete-user/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((user) => user.id === parseInt(userId));

  if (userIndex === -1) {
    res.status(404).send("User not found");
    return;
  }

  users.splice(userIndex, 1);

  console.log("User deleted");

  res.redirect("/users");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
