const bookService = require("../services/book-mongodb.js");
const formidable = require("formidable");

exports.getBooks = (req, res) => {
  bookService
    .getBooks(req.query)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};
exports.getBook = (req, res) => {
  bookService
    .getBook(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};
exports.insertBook = (req, res) => {
  bookService
    .insertBook(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};
exports.updateBook = (req, res) => {
  bookService
    .updateBook(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

exports.updateBookCover = (req, res) => {
  formidable().parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      bookService
        .updateBookCover(req.params.id, files.cover)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).send(err.message));
    }
  });
};

exports.removeBook = (req, res) => {
  bookService
    .removeBook(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};
