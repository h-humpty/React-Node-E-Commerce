const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventoryModel");
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/authMiddleware");

// router.route("/").get(
//   protect,
//   admin,
//   asyncHandler(async (req, res) => {
//     const inventory = await Inventory.find({});
//     res.json(inventory);
//   })
// );

router.route("/").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const startDate = new Date().toISOString().slice(0, 10);
    const endDate = new Date().toISOString();

    const inventory = await Inventory.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.status(201).json(inventory);
  })
);

router.route("/unpaid").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const inventory = await Inventory.aggregate([
      {
        $match: {
          paid: false,
        },
      },
    ]);

    res.json(inventory);
  })
);

router.route("/dates").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    const inventory = await Inventory.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    console.log(new Date(startDate).toISOString());
    // console.log((endDate))
    // console.log(inventory)
    // console.log(inventory)
    res.json(inventory);
  })
);

router.route("/averagecost").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    let today = new Date().toISOString();
    let month = new Date()
    month.setDate(month.getDate() - 30)

    console.log(month)
    console.log(today)

    const inventory = await Inventory.aggregate([
      {
        $match: {
          $and: [
            {
              item_quantity: {
                $gt: 0,
              },
            },
            {
              total_cost: {
                $gt: 0,
              },
            },
            {
              createdAt: {
                $gte: month,
                $lte: new Date(today),
              },
            },
            {
              category_name: {
                $in: [
                  "Spice",
                  "Chicken",
                  "Fruits & Vegetables",
                  "Poultry",
                  "Beef",
                  "Mutton",
                  "Dairy",
                  "Grocery",
                  "Masala",
                ],
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: "$item_name",
          TotalCost: {
            $sum: "$total_cost",
          },
          TotalQuantity: {
            $sum: "$item_quantity",
          },
          LastUpdatedAt: {
            $last: "$updatedAt",
          },
          AverageCost: {
            $avg: {
              $divide: ["$total_cost", "$item_quantity"],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.json(inventory);
  })
);

router.route("/inventorygroup").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const date = new Date();
    const start = new Date(2018, 1, 1);
    // const end = new Date.toISOString(today);
    const inventory = await Inventory.aggregate([
      {
        $match: {
          date_paid: { $gte: start, $lte: date },
        },
      },

      {
        $group: {
          _id: "$paid",
          TotalCost: {
            $sum: "$total_cost",
          },
          TotalQuantity: {
            $sum: "$item_quantity",
          },
          TotalItems: {
            $sum: "$item_cost",
          },
          LastUpdatedAt: {
            $last: "$updatedAt",
          },
        },
      },
    ]);

    // console.log(inventoryCost)

    res.json(inventory);
  })
);

router.route("/inventorycost").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const date = new Date();
    const today = new Date().toISOString();
    const last = new Date(
      date.getTime() - 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    const inventoryCost = await Inventory.aggregate([
      {
        $match: {
          $and: [
            {
              item_quantity: {
                $gt: 0,
              },
            },
            {
              total_cost: {
                $gt: 0,
              },
            },
          ],
          createdAt: {
            $gte: new Date(last),
            $lte: new Date(today),
          },
        },
      },
      {
        $group: {
          _id: "$item_name",
          TotalCost: {
            $sum: "$total_cost",
          },
          TotalQuantity: {
            $sum: "$item_quantity",
          },
          LastUpdatedAt: {
            $last: "$updatedAt",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.json(inventoryCost);
  })
);

router.route("/inventorygroupdetail").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const start = new Date(2018, 1, 1);
    const end = new Date();

    const inventory = await Inventory.aggregate([
      {
        $match: {
          paid: true,
          date_paid: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: "$item_name",
          TotalCost: {
            $sum: "$total_cost",
          },
          TotalQuantity: {
            $sum: "$item_quantity",
          },
          Category: {
            $first: "$category",
          },
        },
      },
    ]);

    res.json(inventory);
  })
);

router.route("/salary").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const inventory = await Inventory.aggregate([
      {
        $match: {
          category_name: "Salary",
        },
      },
    ]);

    res.json(inventory);
  })
);

router.route("/").post(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      user,
      category,
      name,
      cost,
      size,
      quantity,
      totalCost,
      paid,
      datePaid,
      vendor
    } = req.body;

    if (!user) {
      res.status(400);
      throw new Error("No user added");
    } else {
      const inventory = new Inventory({
        user: user._id,
        edited_by: user.name,
        category_name: category,
        item_name: name,
        item_cost: cost,
        item_size: size,
        item_quantity: quantity,
        total_cost: totalCost,
        paid: paid,
        date_paid: datePaid,
        vendor: vendor,
      });
      const createdInventory = await inventory.save();
      res.status(201).json(createdInventory);
    }
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const inventory = await Inventory.findById(req.params.id);
    if (inventory) {
      res.json(inventory);
    } else {
      res.status(404);
      throw new Error("Inventory item not found");
    }
  })
);

router.route("/:id").delete(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const inventory = await Inventory.findById(req.params.id);

    if (inventory) {
      await inventory.remove();
      res.json({ message: "Inventory Item removed" });
    } else {
      res.status(404);
      throw new Error("Inventory Item not found");
    }
  })
);

router.route("/:id").put(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const {
        user,
        category,
        name,
        cost,
        size,
        quantity,
        totalCost,
        paid,
        datePaid,
      } = req.body;

      console.log(req.body)
      

      const inventory = await Inventory.findById(req.params.id);

      if (inventory && user) {
        (inventory.user = user._id),
          (inventory.category = category),
          (inventory.item_name = name),
          (inventory.item_cost = cost),
          (inventory.item_size = size),
          (inventory.item_quantity = quantity),
          (inventory.total_cost = totalCost),
          (inventory.paid = paid),
          (inventory.date_paid = datePaid);

        const updatedInventory = await inventory.save();
        res.json(updatedInventory);
      } else if (!user) {
        (inventory.paid = paid), (inventory.date_paid = datePaid);

        await inventory.save();
      } else {
        res.status(404);
        throw new Error("Inventory Item not found");
      }
    } catch (error) {
      console.error(error);
    }
  })
);

module.exports = router;
