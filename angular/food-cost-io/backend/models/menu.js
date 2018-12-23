const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  hash_key: String,
  customerId: String,
  menus: Array
});

module.exports = mongoose.model('Menus', menuSchema);
