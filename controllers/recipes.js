const { StatusCodes } = require('http-status-codes');
const Recipe = require('../models/Recipe');
const { NotFoundError } = require('../errors');

const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({}).populate('author', 'name lastName');
  res.status(StatusCodes.OK).json({ recipes: recipes, count: recipes.length });
};

const getRecipe = async (req, res) => {
  const { id: recipeId } = req.params;

  const recipe = await Recipe.findById({ _id: recipeId });
  if (!recipe) {
    throw new NotFoundError(`No recipe found with id: ${recipeId}`);
  }
  res.status(StatusCodes.OK).json({ recipe });
};

const createRecipe = async (req, res) => {
  req.body.author = req.user.userId;
  const recipe = await Recipe.create(req.body);
  res.status(StatusCodes.CREATED).json({ recipe });
};

const deleteRecipe = async (req, res) => {
  const {
    user: { userId },
    params: { id: recipeId },
  } = req;

  const recipe = await Recipe.findOneAndRemove({
    _id: recipeId,
    author: userId,
  });
  if (!recipe) {
    throw new NotFoundError(`No recipe found with id: ${recipeId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
};
