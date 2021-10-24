const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const Inventory = require("./models/inventoryModel");
const inventory = require("./data/inventory");
const InventoryCategory = require("./models/inventoryCategoryModel");
const items = require("./data/inventorySubCategory");
const Recipe = require("./models/recipeModel");
const recipeData = require("./data/RecipeData");
const InventoryLevel = require("./models/inventoryLevelModel");
const inventoryLevels = require("./data/inventoryLevels");
const Receipt = require("./models/receiptModel");
const receiptData = require("./data/receiptData");

dotenv.config();

connectDB();

// const importData = async () => {
//   try {
//     // await Order.deleteMany();
//     await Receipt.deleteMany();

//     await Receipt.insertMany(receiptData);

//     console.log("Receipts Imported!".green.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}.red.inverse`);
//     process.exit(1);
//   }
// };

const importData = async () => {
  try {
    await Inventory.deleteMany();

    await Receipt.deleteMany();

    await InventoryLevel.deleteMany();

    const sample = items.map((item) => {
      const { Item, Category, image, MonthlySalary } = item;
      const date = new Date();  

      return {
        category: Category,
        item: Item,
        in_stock: 0,
        updated_at: date,
        vendor: "Grocery",
        image: image ? image : "",
        monthly_salary: MonthlySalary && MonthlySalary,
      };
    });
    // await Receipt.insertMany(receiptData);
    await InventoryLevel.insertMany(sample);

    console.log("InventoryLevels Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}.red.inverse`);
    process.exit(1);
  }
};

// const importData = async () => {
//   try {
//     await Recipe.deleteMany();

//     const sample = recipeData.map(({hits}) => {
//       return {
//         uri: hits[0].recipe.uri,
//         label: hits[0].recipe.label,
//         image: hits[0].recipe.image,
//         ingredientLines: hits[0].recipe.ingredientLines,
//         ingredients: hits[0].recipe.ingredients,
//       };
//     });

//     await Recipe.insertMany(sample);

//     console.log("Recipe Imported!".green.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}.red.inverse`);
//     process.exit(1);
//   }
// };

// const importData = async () => {
//   try {
//     await Inventory.deleteMany();

// const sampleInv = inventory.map((i) => {
//   const {
//     created_at,
//     category,
//     item_name,
//     item_quantity,
//     item_cost,
//     total_cost,
//     paid,
//     date_paid,
//   } = i;

//   let totalCost = i.total_cost && parseInt((i.total_cost).replace(",",""));

//   let itemCost = !isNaN(i["item_cost"]) ? parseInt((item_cost).replace(",","")) : 0;
//   let itemQuantity = !isNaN(i["item_quantity"])
//     ? parseInt((i["item_quantity"]).replace(",",""))
//     : 0;

//   // console.log(i[" total_cost "])

//   return {
//     category_name: category,
//     item_name: item_name,
//     item_quantity: itemQuantity,
//     item_cost: itemCost,
//     total_cost: totalCost,
//     paid: true,
//     date_paid: Date(date_paid),
//     vendor: "Store",
//   };
// });

// // console.log(parseInt(("1,200.00 ").replace(",","")))
// // console.log(sampleInv);
// await Inventory.insertMany(sampleInv);

//     console.log("Inventory Imported!".green.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}.red.inverse`);
//     process.exit(1);
//   }
// };

// const importData = async () => {
//   try {
//     // await Order.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();

//     const createdUsers = await User.insertMany(users);

//     const adminUser = createdUsers[0]._id;

//     const sampleProducts = products.map((product) => {
//       return { ...product, user: adminUser };
//     });

//     await Product.insertMany(sampleProducts);

//     console.log("Product Imported!".green.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}.red.inverse`);
//     process.exit(1);
//   }
// };

// const destroyData = async () => {
//   try {
//     await Order.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();

//     console.log("Data Destroyed!".red.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}.red.inverse`);
//     process.exit(1);
//   }
// };

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
