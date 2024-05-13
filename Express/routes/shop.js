const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../util/path");
router.get("/", (req, res, next) => {
  console.log("In another middleware");
  //   res.send("<h1>Hello from express</h1>");
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
