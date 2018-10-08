const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
  name: String,
  name: String,
  ingredients: [],
  retail: Number,
  cost: Number,
  margin: Number,
  description: String,
  recipe_method: String,
  plating_guide: String,
});

module.exports = mongoose.model('Dish', dishSchema);
