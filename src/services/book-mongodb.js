const db = require("../configs/mongodb.js").getDB();
const ObjectId = require("mongodb").ObjectID;
const store = require("../configs/minio");

exports.getBooks = (queryString) => {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (queryString.search) {
      filter.title = { $regex: new RegExp(queryString.search, "i") };
    }
    db.collection("books")
      .find(filter)
      .project({ title: 1, author: 1, cover: 1 })
      .toArray()
      .then((books) => resolve(books))
      .catch((err) => reject(err));
  });
};
exports.getBook = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("books")
      .findOne({ _id: ObjectId(id) })
      .then((book) => resolve(book))
      .catch((err) => reject(err));
  });
};
exports.insertBook = (body) => {
  return new Promise((resolve, reject) => {
    db.collection("books")
      .insertOne({
        title: body.title,
        collection: body.collection,
        author: body.author,
        publish_year: body.publish_year,
      })
      .then((res) => resolve({ inserted: 1, _id: res.insertedId }))
      .catch((err) => reject(err));
  });
};
exports.updateBook = (id, body) => {
  return new Promise((resolve, reject) => {
    db.collection("books")
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            title: body.title,
            collection: body.collection,
            author: body.author,
            publish_year: body.publish_year,
          },
        }
      )
      .then(() => resolve({ updated: 1 }))
      .catch((err) => reject(err));
  });
};

exports.updateBookCover = (id, file) => {
  return new Promise((resolve, reject) => {
    let url = "";
    console.log(`path: ${file.path}\ntype: ${file.type}`);
    db.collection("books")
      .findOne({ _id: ObjectId(id) })
      .then((book) => {
        let promises = [store.uploadFile(file.path, file.type)];
        if (book.cover) {
          const aux = book.cover.split("?")[0].split("/");
          promises.push(store.removeFile(aux[aux.length - 1]));
        }
        return Promise.all(promises);
      })
      .then(([presignedUrl, deleted]) => {
        url = presignedUrl;
        return db.collection("books").updateOne({ _id: ObjectId(id) }, { $set: { cover: presignedUrl } });
      })
      .then(() => {
        resolve({ updated: 1, url });
      })
      .catch((err) => reject(err));
  });
};

exports.removeBook = (id) => {
  return new Promise((resolve, reject) => {
    db.collection("books")
      .deleteOne({ _id: ObjectId(id) })
      .then(() => resolve({ removed: 1 }))
      .catch((err) => reject(err));
  });
};
