// const http = require("http");

const express = require("express");

const app = express();
app.use("/add-product", (req, res, next) => {
  console.log("in the middleware");
  res.send("<h1>The 'Add product Page'</h1>");
  next();
});
app.use("/", (req, res, next) => {
  console.log("in the another middleware");
  res.send("<h1>Heloo Express</h1>");
});
// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);
