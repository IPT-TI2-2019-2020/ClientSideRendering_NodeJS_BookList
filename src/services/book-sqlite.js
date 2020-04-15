const db = require ('../configs/sqlite');
const uuid = require ('uuid').v4;

exports.getBooks = () => {
  return new Promise ((resolve, reject) => {
    db.all (
      `SELECT DISTINCT _id, title, author FROM books`,
      [],
      (err, rows) => {
        if (err) reject (err);
        resolve (rows);
      }
    );
  });
};
exports.getBook = id => {
  return new Promise ((resolve, reject) => {
    db.all (`SELECT * FROM books WHERE _id = ?`, [id], (err, row) => {
      if (err) reject (err);
      resolve (row);
    });
  });
};
exports.insertBook = body => {
  return new Promise ((resolve, reject) => {
    const id = uuid ();
    db.run (
      `INSERT INTO books(_id, title, author, collection, publish_year) VALUES(?,?,?,?,?)`,
      [id, body.title, body.author, body.collection, body.publish_year],
      err => {
        if (err) reject (err);
        resolve ({inserted: 1, _id: id});
      }
    );
  });
};
exports.updateBook = (id, body) => {
  return new Promise ((resolve, reject) => {
    db.run (
      `UPDATE books  SET title = ?, author = ?, collection = ?, publish_year = ? WHERE _id = ?`,
      [body.title, body.author, body.collection, body.publish_year, id],
      err => {
        if (err) reject (err);
        resolve ({updated: 1});
      }
    );
  });
};
exports.removeBook = id => {
  return new Promise ((resolve, reject) => {
    db.run (`DELETE FROM books WHERE _id = ?`, [id], err => {
      if (err) reject (err);
      resolve ({removed: 1});
    });
  });
};
