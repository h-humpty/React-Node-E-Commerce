const express = require("express");
const router = express.Router();
const InventoryCategory = require("../models/inventoryCategoryModel");
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/authMiddleware");

router.route("/").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const inventoryCategory = await InventoryCategory.find({});
    res.json(inventoryCategory);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const inventoryCategory = await InventoryCategory.findById(req.params.id);
    if (inventoryCategory) {
      res.json(inventoryCategory);
    } else {
      res.status(404);
      throw new Error("Inventory Category not found");
    }
  })
);

module.exports = router