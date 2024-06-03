const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017/shop")
    .then((res) => {
      console.log("connected");
      _db = res.db();
      // callback(res);
      // callback();
    })
    .catch((e) => {
      console.log("no connection ", e);
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
