const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/authentication');

const {
  getAllRecipes,
  getFilteredRecipes,
  getRecipe,
  getUserRecipes,
  createRecipe,
  deleteRecipe,
} = require('../controllers/recipes');

router.route('/').get(getAllRecipes).post(authenticateUser, createRecipe);
router.route('/search').get(getFilteredRecipes);
router.route('/user-recipes').get(authenticateUser, getUserRecipes);
router.route('/:id').get(getRecipe).delete(authenticateUser, deleteRecipe);

module.exports = router;
