const express = require("express");
const router = express.Router();
const Employee = require("../models/employeeModel");
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/authMiddleware");

router.route("/").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const employee = await Employee.find({});

    res.status(201).json(employee);
  })
);

router.route("/").post(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { first_name, last_name, salary, employeed, id_number } = req.body;

    const employee = new Employee({
      first_name,
      last_name,
      salary,
      employeed,
      id_number,
    });

    const newEmployee = await employee.save();
    res.json(newEmployee);
  })
);

router.route("/:id").put(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { first_name, last_name, salary, employeed, id_number, _id } = req.body;

    const employee = await Employee.findById(req.params.id);
    let index = employee.salary.length -1

// console.log(req.body)


     console.log(Number(salary[0].monthly_salary) === Number(employee.salary[index].monthly_salary))
    
    if (
      employee.salary[index].monthly_salary === (salary[0].monthly_salary)
    ) {
      
      const updatedSalary = await Employee.findOneAndUpdate(
{
  "salary._id": salary[0].salary_id
},
{
  $set: {
    "salary.$.start_date": salary[0].start_date,
    "salary.$.off_days_allocated": salary[0].off_days_allocated,
    "salary.$.job_title": salary[0].job_title,
    "salary.$.actual_off_days": salary[0].actual_off_days,
    
  },
},
{useFindAndModify: false}

)

 const updatedEmployee = await Employee.findOneAndUpdate (
   {
     "_id": req.params.id
   },
   {
     $set: {
       "id_number": id_number,
       "first_name": first_name,
       "last_name": last_name,
       "id_number": id_number,
        "employeed" : employeed
     }
   },
    {useFindAndModify: false}
 )

res.json(updatedSalary)

      
     
    } else if (employee.salary[0].monthly_salary !== (salary[0].monthly_salary)) {
     
     console.log(salary[0].salary_id)
     console.log(salary[0].start_date)
     
     
      const updatedEndDate = await Employee.findOneAndUpdate({
        "salary._id": salary[0].salary_id,
      },
      {
        $set: {
          "salary.$.end_date": salary[0].start_date,
        },

      },
      {useFindAndModify: false}
      )

      // console.log(updatedEndDate)


      const updatedEmployee = await Employee.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: {
            salary: salary[0],
          },
        },
        { useFindAndModify: false }
      );

  // console.log(updatedEndDate)
  // console.log(updatedEmployee)

    }
  })
);

router.route("/:id").delete(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.json(employee);
  })
);

module.exports = router;
