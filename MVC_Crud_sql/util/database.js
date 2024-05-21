// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node_complete",
//   password: "admin@123",
// });
// module.exports = pool.promise();

// sequelize

const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_complete", "root", "admin@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
