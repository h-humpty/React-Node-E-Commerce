const mongoose = require("mongoose");

const lineItemsSchema = mongoose.Schema({
  item_id: {
    type: String,
  },
  variant_id: {
    type: String,
  },
  variant_name: {
    type: String,
  },
  item_name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  update: {
    type: Boolean,
    default: false,
    required: true,
  }
});

const receiptSchema = mongoose.Schema({
  receipt_number: {
    type: String,
  },
  receipt_type: {
    type: String,
  },
  refund_for: {
    type: String,
  },
  receipt_date: {
    type: String,
  },
  customer_id: {
    type: String,
  },
  points_earned: {
    type: Number,
  },
  points_balance: {
    type: Number,
  },
  total_discount: {
    type: String,
  },
  total_money: {
    type: Number,
  },

  line_items: [lineItemsSchema],

  created_at: {
    type: String,
  },
  paid : {
    type: Boolean,
    default: true,
  },
  date_paid : {
    type: String
  },
  updated_at: {
    type: String,
  },
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
