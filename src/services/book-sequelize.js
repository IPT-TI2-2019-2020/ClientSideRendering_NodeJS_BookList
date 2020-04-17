const db = require ('../configs/sequelize.js').getDB ();

exports.getBooks = () => {
  return new Promise ((resolve, reject) => {
    db.books
      .findAll ({attributes: ['_id', 'title', 'author']})
      .then (books => resolve (books))
      .catch (err => reject (err));
  });
};
exports.getBook = id => {
  return new Promise ((resolve, reject) => {
    db.books
      .findByPk (id)
      .then (book => resolve (book))
      .catch (err => reject (err));
  });
};
exports.insertBook = body => {
  return new Promise ((resolve, reject) => {
    db.books
      .create (body)
      .then (book => resolve ({inserted: 1, _id: book._id}))
      .catch (err => reject (err));
  });
};
exports.updateBook = (id, body) => {
  return new Promise ((resolve, reject) => {
    db.books
      .update (body, {
        attributes: ['title', 'author', 'collection', 'publish_year'],
        where: {_id: id},
      })
      .then (() => resolve ({updated: 1}))
      .catch (err => reject (err));
  });
};
exports.removeBook = id => {
  return new Promise ((resolve, reject) => {
    db.books
      .destroy ({where: {_id: id}})
      .then (() => resolve ({removed: 1}))
      .catch (err => reject (err));
  });
};
