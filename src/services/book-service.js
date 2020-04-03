const books = require ('./books.json');

exports.getBooks = () => {
  return new Promise ((response, request) => {
    response (
      books.map (book => ({
        _id: book._id,
        title: book.title,
        author: book.author,
      }))
    );
  });
};
exports.getBook = id => {
  return new Promise ((response, request) => {
    response (books.find (book => book._id == id));
  });
};
exports.insertBook = body => {
  return new Promise ((response, request) => {
    response ({inserted: 1});
  });
};
exports.updateBook = (id, body) => {
  return new Promise ((response, request) => {
    response ({updated: 1});
  });
};
exports.removeBook = id => {
  return new Promise ((response, request) => {
    response ({removed: 1});
  });
};
