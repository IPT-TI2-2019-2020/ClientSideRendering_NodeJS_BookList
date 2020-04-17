const Sequelize = require ('sequelize');
const path = require ('path');

const sequelize = new Sequelize ({
  storage: path.resolve (__dirname, '..', 'db', 'orm_sqlite.db'),
  dialect: 'sqlite',
});

let _db;

const connectDB = () => {
  return new Promise ((resolve, reject) => {
    sequelize
      .authenticate ()
      .then (() => {
        _db = {
          books: require ('../models/book.js') (sequelize, Sequelize),
        };
        return sequelize.sync ();
      })
      .then (() => resolve ())
      .catch (err => reject (err));
  });
};

const getDB = () => _db;

const disconnectDB = () => sequelize.close ();

module.exports = {connectDB, getDB, disconnectDB};
