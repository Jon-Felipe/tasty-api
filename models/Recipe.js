const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a recipe name'],
      trim: true,
      maxLength: [200, 'Recipe name can not be more than 200 characters'],
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
    numRatings: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: [0, 'Average rating cannot be less than 0'],
      max: [5, 'Average rating cannot be more than 5'],
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    prepTime: {
      type: Number,
      min: [1, 'Prep time cannot be less than 1'],
    },
    cookTime: {
      type: Number,
      min: [1, 'Cook time cannot be less than 1'],
      required: [true, 'Please provide the recipe cook time'],
    },
    servings: {
      type: Number,
      min: [1, 'Servings cannot be less than 1'],
      required: [true, 'Please provide the recipe servings amount'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'challenging'],
      default: 'Easy',
    },
    cuisine: {
      type: String,
      enum: [
        'african',
        'asian',
        'american',
        'british',
        'chinese',
        'european',
        'indian',
        'italian',
        'spanish',
        'thai',
      ],
      required: [true, 'Please provide the recipe cuisine'],
    },
    dishType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'dessert'],
      required: [true, 'Please provide the dish type'],
    },
    ingredients: {
      type: [String],
      required: [true, 'Please provide the recipe ingredients'],
    },
    instructions: {
      type: [String],
      required: [true, 'Please provide the recipe instructions'],
    },
    equipment: {
      type: [String],
    },
    tips: {
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
