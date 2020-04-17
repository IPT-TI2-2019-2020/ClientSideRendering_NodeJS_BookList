module.exports = (connection, Sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init (
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
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
    {
      sequelize: connection,
      modelName: 'Book'
    }
  );
  return Book;
};
