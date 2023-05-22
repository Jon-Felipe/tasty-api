const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a recipe name'],
      trim: true,
      maxLength: [100, 'Recipe name can not be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxLength: [1000, 'Description can not be more than 1000 characters'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    ingredients: {
      type: [String],
      required: [true, 'Please provide recipe ingredients'],
    },
    directions: {
      type: [String],
      required: [true, 'Please provide recipe directions'],
    },
    equipment: {
      type: [String],
    },
    recipeTips: {
      type: [String],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', RecipeSchema);
