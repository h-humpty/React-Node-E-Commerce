const mongoose = require("mongoose");

const ingredientsSchema = mongoose.Schema({
  text: {
    type: String,
  },
  weight: {
    type: Number,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  average_cost: {
    type: Number,
  },
});

const recipeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  label: {
    type: String,
  },
  image: {
    type: String,
  },
  ingredients: [ingredientsSchema],
  variant_id: {
    type: String,
  },
  total_cost : {
    type: Number,
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
