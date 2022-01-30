const mongoose = require("mongoose");

const salarySchema = mongoose.Schema({
  monthly_salary: {
    type: Number,
  },
  start_date: {
    type: String,
  },
  end_date: {
    type: String,
  },
  actual_off_days: {
    type: Number,
    default: 0,
  },
  off_days_allotted: {
    type: Number,
  },
  job_title: {
    type: String
  },
  
});

const employeeSchema = mongoose.Schema(
  {
    id_number: {
      type: String
    },
    
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    salary: [salarySchema],
    employeed: {
      type: Boolean,
      default: true,
    },
  },
  {
   timestamp: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
