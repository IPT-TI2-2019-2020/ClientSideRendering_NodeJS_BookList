const db = require("../configs/sequelize.js").getDB();
const Op = require("sequelize").Op;

exports.getBooks = (queryString) => {
  return new Promise((resolve, reject) => {
    let where = {};
    if (queryString.search) {
      where.title = { [Op.substring]: queryString.search };
    }
    db.Book.findAll({ attributes: ["_id", "title", "author"], where })
      .then((books) => resolve(books))
      .catch((err) => reject(err));
  });
};
exports.getBook = (id) => {
  return new Promise((resolve, reject) => {
    db.Book.findByPk(id)
      .then((book) => resolve(book))
      .catch((err) => reject(err));
  });
};
exports.insertBook = (body) => {
  return new Promise((resolve, reject) => {
    db.Book.create(body)
      .then((book) => resolve({ inserted: 1, _id: book._id }))
      .catch((err) => reject(err));
  });
};
exports.updateBook = (id, body) => {
  return new Promise((resolve, reject) => {
    db.Book.update(body, {
      fields: ["author", "title", "collection", "publish_year"],
      where: { _id: id },
    })
      .then(() => resolve({ updated: 1 }))
      .catch((err) => reject(err));
  });
};
exports.removeBook = (id, body) => {
  return new Promise((resolve, reject) => {
    db.Book.destroy({ where: { _id: id } })
      .then(() => resolve({ removed: 1 }))
      .catch((err) => reject(err));
  });
};
