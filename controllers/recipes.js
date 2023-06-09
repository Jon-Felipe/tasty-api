const { StatusCodes } = require('http-status-codes');
const Recipe = require('../models/Recipe');
const { NotFoundError } = require('../errors');

const getAllRecipes = async (req, res) => {
  const { search, sort, category, cuisine, mealType } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.name = { $regex: search, $options: 'i' };
  }
  if (category) {
    queryObject.cuisine = { $regex: category, $options: 'i' };
  }
  if (cuisine) {
    queryObject.cuisine = { $regex: cuisine, $options: 'i' };
  }
  if (mealType) {
    queryObject.mealType = { $regex: mealType, $options: 'i' };
  }

  let result = Recipe.find(queryObject).populate('createdBy', 'name lastName');

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('name');
  }
  if (sort === 'z-a') {
    result = result.sort('-name');
  }

  const limit = Number(req.query.limit) || 6;

  const recipes = await result.limit(limit);
  res.status(StatusCodes.OK).json({ recipes: recipes });
};

const getRecipe = async (req, res) => {
  const { id: recipeId } = req.params;

  const recipe = await Recipe.findById({ _id: recipeId }).populate(
    'createdBy',
    'name lastName'
  );
  if (!recipe) {
    throw new NotFoundError(`No recipe found with id: ${recipeId}`);
  }
  res.status(StatusCodes.OK).json({ recipe });
};

const getUserRecipes = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const recipes = await Recipe.find({ createdBy: userId }).populate(
    'createdBy',
    'name lastName'
  );
  res.status(StatusCodes.OK).json({ recipes });
};

const createRecipe = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const recipe = await Recipe.create(req.body);
  res.status(StatusCodes.CREATED).json({ recipe });
};

const deleteRecipe = async (req, res) => {
  const {
    user: { userId },
    params: { id: recipeId },
  } = req;

  await Recipe.findOneAndRemove({
    _id: recipeId,
    createdBy: userId,
  });

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllRecipes,
  getRecipe,
  getUserRecipes,
  createRecipe,
  deleteRecipe,
};
