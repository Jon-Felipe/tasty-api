const mongoose = require('mongoose');

const CookingDetailsSchema = new mongoose.Schema({
  prepTime: {
    type: Number,
    min: [1, 'Prep time cannot be less than 1'],
    required: [true, 'Please provide the recipe prep time'],
  },
  cookTime: {
    type: Number,
    min: [1, 'Cook time cannot be less than 1'],
    required: [true, 'Please provide the recipe cook time'],
  },
});

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
    numReviews: {
      type: Number,
      default: 0,
    },
    cookingDetails: {
      type: CookingDetailsSchema,
    },
    servings: {
      type: Number,
      required: [true, 'Please provide the recipe servings amount'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Challenging'],
      default: 'Easy',
    },
    cuisines: {
      type: String,
      enum: [
        'African',
        'Asian',
        'American',
        'British',
        'Chinese',
        'European',
        'Indian',
        'Italian',
        'Spanish',
        'Thai',
      ],
      required: [true, 'Please provide the recipe cuisine'],
    },
    dishTypes: {
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
