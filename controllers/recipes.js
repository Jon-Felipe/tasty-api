const getAllRecipes = async (req, res) => {
  res.send('getAllRecipes');
};

const getRecipe = async (req, res) => {
  res.send('getRecipe');
};

module.exports = { getAllRecipes, getRecipe };
