const Model = require('objection').Model;

const unique = require('objection-unique')({
  fields: ['title', 'author'],
  identifiers: ['id']
})

class Book extends unique(Model) {
  static get tableName() {
    return "books";
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "author"],
      properties: {
        title: { type: "string", minLength: 1, maxLength: 50 },
        author: { type: "string", minLength: 1, maxLength: 30 }
      }
    }
  }
}

module.exports = Book;