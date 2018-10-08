const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const Dish = require('../models/dish');
const checkAuth = require('../middlewear/check-auth');

// get dishes
router.get('', checkAuth , (req, res, next) => {
  Dish.find().then(documents => {
    res.status(200).json({
      message: "Dishes fetched successfully!",
      dishes: documents
    });
  });
});

//  save dish
router.post('', (req, res, next) => {
  const dish = new Dish({
    name: req.body.name,
    id: req.body.id,
    ingredients: [],
    retail: req.body.retail,
    cost: req.body.cost,
    margin: req.body.margin,
    description: req.body.description,
    recipe_method: req.body.recipe_method,
    plating_guide: req.body.plating_guide,
  })

  dish.save().then( result => {
    res.status(201).json({
      message: "Dish added successfully",
      dish: dish
    });
  });
});


// export the router
module.exports = router;
