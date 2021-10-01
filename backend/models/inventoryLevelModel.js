const mongoose = require("mongoose");

const salarySchema = mongoose.Schema({
monthly_salary: {
  type:Number
},
start_date: {
  type: String
},
end_date: {
  type: String
},
off_days: {
  type: Number
},

})

const inventoryLevelSchema = mongoose.Schema({
  
  category: {
    type: String,
  },
  item: {
    type: String,
  },
  in_stock: {
    type: Number,
  },
  total_cost: {
    type: Number,
  },
  size: {
    type: String
  },
  vendor: {
    type: Array
  },
  average_cost :{
    type: Number
  },
  image: {
    type: String
  },
  salary : [salarySchema],
  employeed : {
    type: Boolean,
    default: true
  },
  updated_at:{
    type: String,
  },
  created_at:{
    type: String,
  },
}, {
  timestamp: true
});

const InventoryLevel = mongoose.model("InventoryLevel", inventoryLevelSchema);

module.exports = InventoryLevel;
