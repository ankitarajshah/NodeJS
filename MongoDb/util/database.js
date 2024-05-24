const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://ankitarajshah:admin123456@cluster0.pweugjg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("connection is successfull");
      _db = client.db();
      callback();
    })
    .catch((e) => {
      console.log("no connection ");
      throw e;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
};
// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
