const Model = require("./Model");

class Book extends Model {
  static get tableName() {
    return "books";
  };
}

module.exports = Book;