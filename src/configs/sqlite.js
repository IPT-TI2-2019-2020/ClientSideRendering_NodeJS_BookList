const sqlite3 = require ('sqlite3').verbose ();
const path = require ('path');

const db = new sqlite3.Database (
  path.resolve (__dirname, '..', 'db', 'raw_sqlite.db'),
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  err => {
    if (err) console.error (err.message);
    else console.log ('Connected to the raw_sqlite database.');
  }
);

db.run (`CREATE TABLE IF NOT EXISTS books (
'_id' VARCHAR(36) PRIMARY KEY,
'title' VARCHAR(255),
'author' VARCHAR(255),
'collection' VARCHAR(255),
'publish_year' INT(4)
)`);

module.exports = db;
