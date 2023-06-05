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
    numOfRatings: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    recipeDetails: {
      prepTime: { type: Number, default: 0 },
      cookTime: { type: Number, default: 0 },
      additionalTime: { type: Number, default: 0 },
      totalTime: { type: Number, default: 0 },
      servings: { type: Number, default: 0 },
      yield: { type: Number, default: 0 },
      difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Easy',
      },
    },
    nutritionFacts: {
      calories: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', RecipeSchema);
