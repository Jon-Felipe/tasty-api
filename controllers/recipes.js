const getAllRecipes = async (req, res) => {
  res.send('getAllRecipes');
};

const getRecipe = async (req, res) => {
  res.send('getRecipe');
};

const createRecipe = async (req, res) => {
  res.send('create recipe');
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
