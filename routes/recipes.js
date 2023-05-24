const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/authentication');

const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
} = require('../controllers/recipes');

router.route('/').get(getAllRecipes).post(authenticateUser, createRecipe);
router.route('/:id').get(getRecipe).delete(authenticateUser, deleteRecipe);

module.exports = router;
