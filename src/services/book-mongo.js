const db = require ('../configs/mongo.js').getDB ();
const ObjectId = require ('mongodb').ObjectID;

exports.getBooks = () => {
  return new Promise ((resolve, reject) => {
    db
      .collection ('books')
      .find ()
      .project({ 'title' : 1, 'author' : 1 })
      .toArray ()
      .then (books => resolve (books))
      .catch (err => reject (err));
  });
};

exports.getBook = id => {
  return new Promise ((resolve, reject) => {
    db
      .collection ('books')
      .findOne ({_id: ObjectId (id)})
      .then (book => resolve (book))
      .catch (err => reject (err));
  });
};

exports.insertBook = book => {
  return new Promise ((resolve, reject) => {
    db
      .collection ('books')
      .insertOne ({
        title: book.title,
        collection: book.collection,
        author: book.author,
        publish_year: book.publish_year,
      })
      .then (res => resolve ({_id: res.insertedId, inserted: res.result.n}))
      .catch (err => reject (err));
  });
};

exports.updateBook = (id, book) => {
  return new Promise ((resolve, reject) => {
    db
      .collection ('books')
      .updateOne (
        {_id: ObjectId (id)},
        {
          $set: {
            title: book.title,
            collection: book.collection,
            author: book.author,
            publish_year: book.publish_year,
          },
        }
      )
      .then (res => resolve ({updated: res.result.n}))
      .catch (err => reject (err));
  });
};

exports.removeBook = id => {
  return new Promise ((resolve, reject) => {
    db
      .collection ('books')
      .deleteOne ({_id: ObjectId (id)})
      .then (res => resolve ({deleted: res.result.n}))
      .catch (err => reject (err));
  });
};
