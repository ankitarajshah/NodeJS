const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Authorization header missing");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1]; // Split by space to get the token part

  if (!token) {
    const error = new Error("Token not provided");
    error.statusCode = 401;
    throw error;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secretekeysecrete"); // Replace with your actual secret key
  } catch (err) {
    err.statusCode = 500; // Internal server error
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Authentication failed");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId; // Attach userId to the request object
  next(); // Continue to the next middleware or route handler
};
