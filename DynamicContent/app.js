const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// const expressHbs = require("express-handlebars").engine;
// app.engine(
//   "handlebars",
//   expressHbs({
//     layoutsDir: "views/layouts",
//     defaultLayout: "main-layout",
//     extname: "handlebars",
//   })
// );

// app.set("view engine", "handlebars");
app.set("view engine", "ejs");
app.set("views", "views");

// app.set("view engine", "pug");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

//error middleware
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not found" });
});

app.listen(3000);
