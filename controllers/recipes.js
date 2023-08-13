const { StatusCodes } = require('http-status-codes');
const Recipe = require('../models/Recipe');
const { NotFoundError } = require('../errors');

const getAllRecipes = async (req, res) => {
  const { search, sort, cuisine, dishType } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.name = { $regex: search, $options: 'i' };
  }
  if (cuisine && cuisine != 'all') {
    queryObject.cuisine = { $in: cuisine.split(',') };
  }
  if (dishType && dishType !== 'all') {
    queryObject.dishType = dishType;
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

  const totalRecipes = await Recipe.countDocuments(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || totalRecipes;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const recipes = await result;
  const numOfPages = Math.ceil(totalRecipes / limit);

  res
    .status(StatusCodes.OK)
    .json({ recipes: recipes, totalRecipes, numOfPages });
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
  const { search, sort } = req.query;

  let queryObject = { createdBy: userId };

  if (search) {
    queryObject.name = { $regex: search, $options: 'i' };
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

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const recipes = await result;

  const totalRecipes = await Recipe.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalRecipes / limit);

  res.status(StatusCodes.OK).json({ recipes: recipes, numOfPages });
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
