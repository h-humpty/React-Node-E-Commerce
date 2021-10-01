const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    edited_by: {
      type: String,
    },
    category_name: {
      type: String,
    },
    item_name: {
      type: String,
    },
    item_cost: {
      type: Number,
    },
    item_size : {
      type: String, 
    },
    item_quantity: {
        type: Number,
      },
    total_cost: {
      type: Number,
      default: 0
    },
    paid:{
      type: Boolean,
    },
    date_paid: {
      type: Date,
    },
    vendor: {
      type: String
    },
    updated: {
      type: Boolean,
      default: false,
    }
  }, {
    timestamps: true
});


const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
