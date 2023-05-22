const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/authentication');

const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipes');

router.route('/').get(getAllRecipes).post(authenticateUser, createRecipe);
router
  .route('/:id')
  .get(getRecipe)
  .put(authenticateUser, updateRecipe)
  .delete(authenticateUser, deleteRecipe);

module.exports = router;
