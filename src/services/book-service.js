const books = require ('./books.json');

exports.getBooks = () => {
  return new Promise ((resolve, reject) => {
    resolve (
      books.map (book => ({
        _id: book._id,
        title: book.title,
        author: book.author,
      }))
    );
  });
};
exports.getBook = id => {
  return new Promise ((resolve, reject) => {
    resolve (books.find (book => book._id === id));
  });
};
exports.insertBook = body => {
  return new Promise ((resolve, reject) => {
    resolve ({inserted: 1});
  });
};
exports.updateBook = (id, body) => {
  return new Promise ((resolve, reject) => {
    resolve ({updated: 1});
  });
};
exports.removeBook = id => {
  return new Promise ((resolve, reject) => {
    resolve ({removed: 1});
  });
};
