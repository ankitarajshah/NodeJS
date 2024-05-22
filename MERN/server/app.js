const express = require("express");
const app = express();

const router = require("./router/auth-router");

//mount router
app.use("/api/auth", router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
