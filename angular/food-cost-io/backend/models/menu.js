const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  menu_name: String,
  id: String,
  hash_key: String,
  published: Boolean,
  parent_group: String,
  members: []
});

module.exports = mongoose.model('Menus', menuSchema);
