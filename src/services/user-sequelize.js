const db = require("../configs/sequelize").getDB();
const cipher = require("../helpers/cipher");
const roles = require("../helpers/roles");
const Op = require("sequelize").Op;

exports.register = (username, rawPassword, role) => {
  return new Promise((resolve, reject) => {
    try {
      db.User.findOne({ where: { username: username } })
        .then((found) => {
          if (!found) {
            if (Object.values(roles).indexOf(role) > -1) {
              if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(rawPassword)) {
                const dataIv = cipher.generateIv();
                const password = cipher.encrypt(rawPassword, dataIv);
                db.User.create({ username, password, role, dataIv })
                  .then(() => resolve())
                  .catch((error) => reject(error.message));
              } else reject("invalid password");
            } else reject("invalid role");
          } else reject("username already in use");
        })
        .catch((error) => reject(error.message));
    } catch (error) {
      reject(error.message);
    }
  });
};

exports.authenticate = (username, rawPassword) => {
  return new Promise((resolve, reject) => {
    db.User.findOne({ where: { username: username } })
      .then((user) => {
        if (user) {
          const password = cipher.decrypt(user.password, user.dataIv);
          if (password == rawPassword) resolve({ _id: user._id, role: user.role });
        }
        reject(new Error("username and password don't match"));
      })
      .catch((error) => reject(error));
  });
};

exports.getBooks = (userId, queryString) => {
  return new Promise((resolve, reject) => {
    let where = {};
    if (queryString.search) {
      where.title = { [Op.substring]: queryString.search };
    }
    db.User.findByPk(userId)
      .then((user) => user.getBooks({ attributes: ["_id", "title", "author"], where }))
      .then((books) => resolve(books))
      .catch((error) => reject(error));
  });
};
exports.addBook = (userId, bookId) => {
  return new Promise((resolve, reject) => {
    db.User.findByPk(userId)
      .then((user) => user.addBook(bookId))
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};
exports.removeBook = (userId, bookId) => {
  return new Promise((resolve, reject) => {
    db.User.findByPk(userId)
      .then((user) => user.removeBook(bookId))
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};
