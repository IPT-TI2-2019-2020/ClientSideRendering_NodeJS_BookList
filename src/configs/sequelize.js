const Sequelize = require ('sequelize');
const path = require ('path');

const sequelize = new Sequelize ({
  storage: path.resolve (__dirname, '..', 'db', 'orm_sqlite.db'),
  dialect: 'sqlite',
  logging: false,
});

const connectDB = () => {
  return new Promise ((resolve, reject) => {
    sequelize
      .authenticate ()
      .then (() => sequelize.sync ())
      .then (() => resolve ())
      .catch (err => reject (err));
  });
};

const getDB = () => ({
  books: require ('../models/book.js') (sequelize, Sequelize),
});

const disconnectDB = () => sequelize.close ();

module.exports = {connectDB, getDB, disconnectDB};
