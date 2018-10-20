const Ingredients = require('../models/ingredients');
const checkAuth = require('../middlewear/check-auth');

exports.getCustomerIngredients = ('/:id', checkAuth , (req, res, next) => {
  console.log(req.params);
  Ingredients.findOne({ customerId: req.params.id}).then (ingredients => {
    if (ingredients) {
      res.status(200).json(ingredients);
    } else {
      res.status(404).json({message: "Customer's ingredients Doc not found."})
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Fetching customer\' Ingredients Doc Failed!'
    });
  });
});

exports.putCustomerIngredients = ('/:id', checkAuth , (req, res, next) => {
  console.log('put ingredient call received in the back end');
  // Ingredients.findOne({ customerId: req.params.id}).then (ingredients => {
  //   if (ingredients) {
  //     res.status(200).json(ingredients);
  //   } else {
  //     res.status(404).json({message: "Customer's ingredients Doc not found."})
  //   }
  // })
  // .catch(error => {
  //   res.status(500).json({
  //     message: 'Fetching customer\' Ingredients Doc Failed!'
  //   });
  // });
});
