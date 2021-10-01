const express = require("express");
const router = express.Router();
const InventoryLevel = require("../models/inventoryLevelModel");
const Receipt = require("../models/receiptModel");
const Recipe = require("../models/recipeModel");
const Inventory = require("../models/inventoryModel");
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/authMiddleware");
const ObjectId = require("mongodb").ObjectId;

async function intervalFunction() {
  let inventoryLevel = await InventoryLevel.aggregate([
    {
      $sort: {
        item: 1,
      },
    },
  ]);

  let receipts = await Receipt.aggregate([
    {
      $unwind: {
        path: "$line_items",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $match: {
        "line_items.update": false,
      },
    },
    {
      $sort: {
        receipt_number: -1,
      },
    },
    {
      $limit: 100,
    },
  ]);

  let inventory = await Inventory.aggregate([
    {
      $match: {
        updated: false,
      },
    },
  ]);

  let inventoryCost = await Inventory.aggregate([
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
              $gte: new Date("Wed, 30 Sep 2020 00:00:00 GMT"),
              $lte: new Date("Thu, 30 Sep 2021 00:00:00 GMT"),
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
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  try {
    const date = new Date();
    const today = new Date().toISOString();
    const last = new Date(
      date.getTime() - 30 * 24 * 60 * 60 * 1000
    ).toISOString();

    (async () => {
      try {
        // for (let i = 0; i < inventoryLevel.length; i++) {
        // const { updated_at, item, category } = inventoryLevel;
        for (let j = 0; j < receipts.length; j++) {
          // const {
          //   _id,
          //   total_quantity,
          //   item_name,
          //   category_name,
          //   receipt_date,
          // } = receipts;

          let name =
            receipts[j].line_items.variant_name &&
            receipts[j].line_items.variant_name !== undefined
              ? receipts[j].line_items.variant_name.split("/")[0].trim()
              : receipts[j].category_name;
          let size =
            receipts[j].line_items.variant_name &&
            receipts[j].line_items.variant_name.split("/")[1] !== undefined &&
            receipts[j].line_items.variant_name.split("/")[1].trim();

          if (
            // name === inventoryLevel[i].item &&
            receipts[j].line_items.update === false
          ) {
            let inventoryLevel = await InventoryLevel.findOne({ item: name });

            if (inventoryLevel) {
              let totalQuantity =
                inventoryLevel.in_stock - receipts[j].line_items.quantity;

              await InventoryLevel.findOneAndUpdate(
                { _id: inventoryLevel._id },
                {
                  $set: {
                    updated_at_receipt: receipts[j].receipt_date,
                    in_stock: totalQuantity,
                  },
                },
                { useFindAndModify: false }
              );

              await Receipt.findOneAndUpdate(
                {
                  "line_items._id": receipts[j].line_items._id,
                },
                {
                  $set: {
                    "line_items.$.update": true,
                  },
                },
                { useFindAndModify: false }
              );
            } else {
              let recipes = await Recipe.findOne({ label: name });

              if (recipes) {
                for (let k = 0; k < recipes.ingredients.length; k++) {
                  let inventoryLevelRecipe = await InventoryLevel.findOne({
                    item: recipes.ingredients[k].text,
                  });

                  if (inventoryLevelRecipe) {
                    let newQuantitySize =
                      size && size === "Half"
                        ? receipts[j].line_items.quantity / 2
                        : receipts[j].line_items.quantity;

                    let totalQuantityRecipe =
                      recipes.ingredients[k].weight * newQuantitySize;

                    let updateStock =
                      inventoryLevelRecipe.in_stock - totalQuantityRecipe;

                    await InventoryLevel.findOneAndUpdate(
                      { _id: inventoryLevelRecipe._id },
                      {
                        $set: {
                          updated_at_receipt: receipts[j].receipt_date,
                          in_stock: updateStock,
                        },
                      },
                      { useFindAndModify: false }
                    );

                    await Receipt.findOneAndUpdate(
                      {
                        "line_items._id": receipts[j].line_items._id,
                      },
                      {
                        $set: {
                          "line_items.$.update": true,
                        },
                      },
                      { useFindAndModify: false }
                    );
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();

    (async () => {
      try {
        for (let i = 0; i < inventoryCost.length; i++) {
          let averageCost =
            inventoryCost[i].TotalCost / inventoryCost[i].TotalQuantity;

          await InventoryLevel.findOneAndUpdate(
            { item: inventoryCost[i]._id },
            {
              $set: {
                average_cost: averageCost,
              },
            },
            { useFindAndModify: false }
          );
        }
      } catch (err) {
        console.error(err);
      }
    })();

    (async () => {
      try {
        for (let i = 0; i < inventory.length; i++) {
          if (inventory[i].updated === false) {
            // console.log(inventory[i]._id)
            await InventoryLevel.findOneAndUpdate(
              { item: inventory[i].item_name },
              {
                $set: {
                  updated_at_inventory: inventory[i].createdAt,
                },
                $inc: {
                  in_stock: inventory[i].item_quantity,
                },
              },
              { useFindAndModify: false }
            );

            await Inventory.findOneAndUpdate(
              {
                _id: inventory[i]._id,
              },
              {
                $set: {
                  updated: true,
                },
              },
              { useFindAndModify: false }
            );
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  } catch (error) {
    console.error(error);
  }
}

setInterval(intervalFunction, 600000);

router.route("/updateinventory").get(protect, admin);

router.route("/").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const inventoryLevel = await InventoryLevel.find({});
    res.status(201).json(inventoryLevel);
  })
);

router.route("/salary").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const inventoryLevel = await InventoryLevel.aggregate([
      {
        $match: {
          category: "Salary",
        },
      },
    ]);
    res.status(201).json(inventoryLevel);
  })
);

router.route("/grouped").get(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const inventoryLevel = await InventoryLevel.aggregate([
      {
        $group: {
          _id: "$category",
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.status(201).json(inventoryLevel);
  })
);

router.route("/").post(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { user, category, item, salary, created_at } = req.body;

    if (!user) {
      res.status(400);
      throw new Error("No Inventory Level added");
    } else {
      const inventoryLevel = new InventoryLevel({
        user: user._id,
        category,
        item,
        salary,
        created_at,
      });
      const createdInventory = await inventoryLevel.save();
      res.status(201).json(createdInventory);
    }
  })
);

router.route("/").put(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const { item, employeed, id, monthly_salary, start_date } = req.body;

      const packaged = {
        monthly_salary: parseInt(monthly_salary.replace(",", "")),
        start_date: start_date,
      };
      const inventoryLevel = await InventoryLevel.find({ item: item });
      const inventoryLevelArr = await InventoryLevel.aggregate([
        {
          $unwind: {
            path: "$salary",
          },
        },
        {
          $match: {
            "salary._id": ObjectId(id),
          },
        },
        {
          $project: {
            "salary.monthly_salary": 1,
            "salary.end_date": 1,
          },
        },
      ]);

      // console.log(id);
      // console.log(start_date)
      // console.log(
      //   inventoryLevelArr[0].salary.monthly_salary !== monthly_salary
      // );

      if (
        inventoryLevelArr[0].salary.monthly_salary === monthly_salary &&
        employeed === false
      ) {
        inventoryLevel.employeed = employeed;

        await InventoryLevel.findOneAndUpdate(
          {
            item: item,
          },
          {
            $set: {
              employeed: employeed,
            },
          },
          { useFindAndModify: false }
        );

        await InventoryLevel.findOneAndUpdate(
          {
            "salary._id": id,
          },
          {
            $set: {
              "salary.$.end_date": start_date,
            },
          },
          { useFindAndModify: false }
        );
      } else if (
        inventoryLevelArr[0].salary.monthly_salary !== monthly_salary
      ) {
        await InventoryLevel.findOneAndUpdate(
          {
            item: item,
          },
          {
            $push: {
              salary: packaged,
            },
          },
          { useFindAndModify: false }
        );

        if (!inventoryLevelArr[0].salary.end_date) {
          await InventoryLevel.findOneAndUpdate(
            {
              "salary._id": id,
            },
            {
              $set: {
                "salary.$.end_date": start_date,
              },
            },
            { useFindAndModify: false }
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  })
);

router.get(
  "/:category",
  asyncHandler(async (req, res) => {
    const inventoryLevel = await InventoryLevel.find({
      category: req.params.category,
    });
    if (inventoryLevel) {
      res.json(inventoryLevel);
    } else {
      res.status(404);
      throw new Error("Inventory Level item not found");
    }
  })
);

router.route("/:id").delete(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const inventoryLevel = await InventoryLevel.findById(req.params.id);

    if (inventoryLevel) {
      await inventoryLevel.remove();
      res.json({ message: "Inventory Level Item removed" });
    } else {
      res.status(404);
      throw new Error("Inventory Level Item not found");
    }
  })
);

// router.route("/:id").put(
//   protect,
//   admin,
//   asyncHandler(async (req, res) => {
//     const { user, variant_id, store_id, in_stock, updated_at } = req.body;
//     const inventoryLevel = await InventoryLevel.findById(req.params.id);

//     if (inventoryLevel) {
//       (inventoryLevel.user = user._id),
//         (inventoryLevel.variant_id = variant_id),
//         (inventoryLevel.store_id = store_id),
//         (inventoryLevel.in_stock = in_stock),
//         (inventoryLevel.updated_at = updated_at);

//       const updatedInventoryLevel = await inventoryLevel.save();
//       res.json(updatedInventoryLevel);
//     } else {
//       res.status(404);
//       throw new Error("Inventory Item not found");
//     }
//   })
// );

module.exports = router;
