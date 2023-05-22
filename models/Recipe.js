const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a recipe name'],
    trim: true,
    maxLength: [100, 'Recipe name can not be more than 100 characters'],
  },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
