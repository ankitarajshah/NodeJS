// exports.getLogin = (req, res, next) => {
//   const isLoggedIn = req.get("Cookie").split("=")[1] === "true";
//   console.log(req.get("Cookie").split("=")[1]);
//   res.render("auth/login", {
//     path: "/login",
//     pageTitle: "Login",
//     isAuthenticated: isLoggedIn,
//   });
// };
exports.getLogin = (req, res, next) => {
  const cookie = req.get("Cookie");
  let isLoggedIn = false;

  if (cookie) {
    const cookieValue = cookie.split("=")[1];
    isLoggedIn = cookieValue === "true";
    console.log(cookieValue);
  } else {
    console.log("No Cookie header found.");
  }

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

// exports.postLogin = (req, res, next) => {
//   // req.isLoggedIn = true;
//   res.setHeader("Set-Cookie", "loggedIn=true ;Max-Age=10;HttpOnly");
//   req.session.isLoggedIn = true;
//   res.redirect("/");
// };
exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10; HttpOnly");
  res.redirect("/");
};
