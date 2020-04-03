const bookService = require ('../services/book-service.js');

exports.getBooks = (req, res) => {
  bookService
    .getBooks ()
    .then (result => res.json (result))
    .catch (err => res.status (500).send (err.message));
};
exports.getBook = (req, res) => {
  bookService
    .getBook (req.params.id)
    .then (result => res.json (result))
    .catch (err => res.status (500).send (err.message));
};
exports.insertBook = (req, res) => {
  bookService
    .insertBook (req.body)
    .then (result => res.json (result))
    .catch (err => res.status (500).send (err.message));
};
exports.updateBook = (req, res) => {
  bookService
    .updateBook (req.params.id, req.body)
    .then (result => res.json (result))
    .catch (err => res.status (500).send (err.message));
};
exports.removeBook = (req, res) => {
  bookService
    .removeBook (req.params.id)
    .then (result => res.json (result))
    .catch (err => res.status (500).send (err.message));
};
