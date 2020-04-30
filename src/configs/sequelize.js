const Sequelize = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  storage: path.resolve(__dirname, "..", "db", "orm_sqlite.db"),
  dialect: "sqlite",
});
let _db;

const connectDB = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        _db = {
          Book: require("../models/book.js")(sequelize, Sequelize),
          User: require("../models/user.js")(sequelize, Sequelize),
        };
        for (const key in _db) {
          if (_db[key].associate) {
            _db[key].associate(_db);
          }
        }
        return sequelize.sync();
      })
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};
const getDB = () => _db;
const disconnectDB = () => sequelize.close();

module.exports = { connectDB, getDB, disconnectDB };
