const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const variantSchema = mongoose.Schema({
  variant_id: { type: String },
  item_id: { type: String },
  sku: { type: String },
  reference_variant_id: { type: String },
  option1_value: { type: String },
  option2_value: { type: String },
  cost: { type: Number },
  default_pricing_type: { type: String },
  default_price: { type: Number },
  stores: { type: Array },
  created_at: { type: String },
  updated_at: { type: String },
  deleted_at: { type: String },
  variant_image: { type: String },
});

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  item_name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,

    default: 0,
  },
  category_id: {
    type: String,
  },
  option1_name: {
    type: String,
  },
  option2_name: {
    type: String,
  },
  reviews: [reviewSchema],

  variants: [variantSchema],
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
  sold_by_weight: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
