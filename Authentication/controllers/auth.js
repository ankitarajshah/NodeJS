const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn, "loginnn");
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("66684e6c5af4de0d8e770506")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      // req.session.isAuthenticated = true; // Set isAuthenticated to true after successful login
      // res.redirect("/");
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err, "Error logging out");
      return next(err); // Call the next middleware with the error
    }
    res.clearCookie("connect.sid", { path: "/" });
    // req.session.isAuthenticated = false; // Set isAuthenticated to false after logout
    res.redirect("/login");
  });
};
