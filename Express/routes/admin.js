const path = require("path");
const express = require("express");

const router = express.Router();
const rootDir = require("../util/path");
//incoming request
router.get("/add-product", (req, res, next) => {
  console.log("in middleware");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

//incoming request used for flitering
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
