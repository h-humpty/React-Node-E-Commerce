const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipeModel");
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/authMiddleware");

router.route("/").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({});

    res.json(recipes);
  })
);

router.route("/").post(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {label, image, ingredients, variant_id, total_cost } = req.body;

    const recipe = new Recipe({
      user: req.user._id,
      label,
      image,
      ingredients,
      variant_id,
      total_cost
    });

    const createdRecipe = await recipe.save();

    res.status(201).json(createdRecipe);
  })
);

router.route("/:id").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)

    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404);
      throw new Error("Recipe not found");
    }
  })
);

router.route("/:id").put(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {label, image, ingredients, variant_id, id } = req.body;

    const recipe = await Recipe.findById(req.params.id);
    // console.log(recipe)

    if (recipe) {
      recipe.label = label,
      recipe.image = image,
      recipe.ingredients = ingredients,
      recipe.variant_id= variant_id && variant_id


      const updatedRecipe = await recipe.save();
      res.json(updatedRecipe);
    } else {
      res.status(404);
      throw new Error("Recipe not found");
    }
  })
);

router.route("/:id").delete(
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const recipe = await Recipe.findById(req.params.id);
  
      if (recipe) {
        await recipe.remove();
        res.json({ message: "Recipe removed" });
      } else {
        res.status(404);
        throw new Error("Recipe not found");
      }
    })
  );

  module.exports = router