const User = require('./User');
const Book = require('./Book');
const Shopping = require('./shopping');


User.hasMany(Book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Book.belongsTo(User, {
  foreignKey: 'user_id'
});

//Shopping.hasMany(User)


module.exports = { User, Book };
