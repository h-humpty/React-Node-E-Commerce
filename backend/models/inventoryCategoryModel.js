const mongoose = require("mongoose");

const inventoryCategorySchema = mongoose.Schema({
  category_name: {
    type: String,
  },
  item_name: {
    type: String,
  },
});

const InventoryCategory = mongoose.model(
  "InventoryCategory",
  inventoryCategorySchema
);

module.exports = InventoryCategory;
