const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const notFound = require("./middleware/errorMiddleware");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.options("*", cors());

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const inventoryCategoryRoutes = require("./routes/inventoryCategoryRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const inventoryLevelRoutes = require("./routes/inventoryLevelRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const receiptRoutes = require("./routes/receiptRoutes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/inventoryCategory", inventoryCategoryRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/inventoryLevel", inventoryLevelRoutes);
app.use("/api/receipt", receiptRoutes);
app.use("/api/upload", uploadRoutes);

// const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname)));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
