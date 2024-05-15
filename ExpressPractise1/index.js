const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

// console.log(path.join(__dirname, "/public"));

const staticPath = path.join(__dirname, "/views");
// console.log(__dirname);

//templates

const templatePath = path.join(__dirname, "/templates/views");
console.log(templatePath);

const partialsPath = path.join(__dirname, "/templates/partials");

//to set view engine
app.set("view engine", "hbs");
app.set("views", templatePath);

hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));
app.get("/", (req, res, next) => {
  console.log("Hello world");
  res.render("index");
});
//template engine route
app.get("/users", (req, res, next) => {
  res.render("users", { userList: "UserList" });
});
app.get("/", (req, res, next) => {
  console.log("Hello world");
  res.send("Hello world server");
});
//error
app.get("*", (req, res) => {
  res.render("404", { errorComment: "Opps page not found" });
});

app.listen(8000, () => {
  console.log("Hello world at port 8000");
});
