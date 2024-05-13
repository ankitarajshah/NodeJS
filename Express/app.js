const express = require("express");
const path = require("path");
const app = express();

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
//routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

//static files
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", (req, res, next) => {
//   console.log("Always run middleware");
//   next();
// });

//error
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.listen(3000);
