const { StatusCodes } = require('http-status-codes');
const Recipe = require('../models/Recipe');
const { UnauthenticatedError } = require('../errors');

const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find({});
  res.status(StatusCodes.OK).json({ recipes: recipes, count: recipes.length });
};

const getRecipe = async (req, res) => {
  res.send('getRecipe');
};

const createRecipe = async (req, res) => {
  req.body.author = req.user.userId;
  const recipe = await Recipe.create(req.body);
  res.status(StatusCodes.CREATED).json({ recipe });
};

const updateRecipe = async (req, res) => {
  res.send('update recipe');
};

const deleteRecipe = async (req, res) => {
  res.send('delete recipe');
};

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
