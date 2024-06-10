// const path = require("path");

// const express = require("express");
// const bodyParser = require("body-parser");

// const errorController = require("./controllers/error");

// const User = require("./models/user");

// const MONGODB_URI = "mongodb://localhost:27017/shop";
// const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);

// const app = express();

// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection: "sessions",
// });

// app.set("view engine", "ejs");
// app.set("views", "views");

// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
// const authRoutes = require("./routes/auth");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   session({
//     secret: "my secrete",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );

// app.use((req, res, next) => {
//   User.findById("665ee0c749f789900e92bc2f")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);
// app.use(authRoutes);

// app.use(errorController.get404);
// mongoose
//   .connect(MONGODB_URI)
//   .then((result) => {
//     User.findOne().then((user) => {
//       if (!user) {
//         const user = new User({
//           name: "Ankita",
//           email: "anki@gmail.com",
//           cart: {
//             items: [],
//           },
//         });
//         user.save();
//       }
//     });
//     console.log(result, "connected");

//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI = "mongodb://localhost:27017/shop";

const app = express();

// Configure the session store
const store = new MongoDBStore({
  uri: MONGODB_URI, // Use 'uri' instead of 'url' as per the documentation
  collection: "sessions",
});

// Setting up the view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Import routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret", // Ensure this is a secure secret in production
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Middleware to attach a user to the request
app.use((req, res, next) => {
  User.findById("665ee0c749f789900e92bc2f")
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err); // Pass the error to the error handling middleware
    });
});

// Route handlers
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// 404 error handler
app.use(errorController.get404);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

// Connect to MongoDB and start the server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Ankita",
          email: "anki@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
