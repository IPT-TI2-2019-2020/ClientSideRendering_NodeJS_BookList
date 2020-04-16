module.exports = (sequelize, Sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init (
    {
      _id: {
        type: Sequelize.STRING (36),
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      collection: {
        type: Sequelize.STRING,
      },
      publish_year: {
        type: Sequelize.NUMBER (4),
      },
    },
    {sequelize, modelName: 'Book'}
  );
  
  return Book;
};
