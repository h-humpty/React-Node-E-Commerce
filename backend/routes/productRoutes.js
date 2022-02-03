const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/authMiddleware");

router.get(
  "/",
  asyncHandler(async (req, res) => {

  
    const pageSize = 10;
    const page = req.query.pageNumber || 1;
    const keyword = req.query.keyword
      ? {
          item_name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log(req);

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword });
    // .limit(pageSize)
    // .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// GET items to display in the dropdown list for recipes

router.get(
  "/filtered",
  asyncHandler(async (req, res) => {
    const products = await Product.aggregate([
      {
        $unwind: {
          path: "$variants",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "variants.stores.available_for_sale": true,
          "variants.option2_value": {
            $ne: "Half",
          },
          "variants.option1_value": {
            $ne: "Half",
          },
        },
      },
      {
        $group: {
          _id: "$variants.option1_value",
          image: {
            $first: "$image_url",
          },
          category: {
            $first: "$item_name",
          },
          variant_id: {
            $first: "$variants.variant_id",
          },
          option1_name: {
            $first: "$option1_name",
          },
          id: {
            $first: "$_id",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.json(products);
  })
);

// // @desc    Get top rated products
// // @route   GET /api/products/top
// // @access  Public
router.get(
  "/top",
  asyncHandler(async (req, res) => {
    const products = await Product.aggregate([
      {
        $match: {
          item_name: "Deals",
        },
      },
      {
        $unwind: {
          path: "$variants",
        },
      },
    ]);
    res.json(products);
  })
);

router.get(
  "/variants",
  asyncHandler(async (req, res) => {

    const item = req.query.name

    const products = await Product.aggregate([
      {
        '$unwind': {
          'path': '$variants'
        }
      }, {
        '$match': {
          '$or': [
            {
              'variants.option1_value': `${item}`
            }, {
              'item_name': `${item}`
            }
          ]
        }
      }
    ]);
    res.json(products);
  })
);

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.route("/").post(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = new Product({
      user: req.user._id,
      item_name: "Sample name",
      image_url: "Sample name",
      description: "Sample name",
      id: "Sample name",
      category_id: "Sample name",
      option1_name: "Sample name",
      option2_name: "Sample name",
      variants: [],
      created_at: "Sample name",
      updated_at: "Sample name",
      sold_by_weight: "Sample name",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    //   const product = products.find((p) => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

router.route("/:id").delete(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.route("/:id").put(
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      user,
      item_name,
      image_url,
      description,
      id,
      category_id,
      option1_name,
      option2_name,
      variants,
      created_at,
      updated_at,
      sold_by_weight,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      // product.name = name;
      // product.price = price;
      // product.description = description;
      // product.image = image;
      // product.brand = brand;
      // product.category = category;
      // product.countInStock = countInStock;

      product.user = user;
      product.item_name = item_name;
      product.image_url = image_url;
      product.description = description;
      product.id = id;
      product.category_id = category_id;
      product.option1_name = option1_name;
      product.option2_name = option2_name;
      product.variants = variants;
      product.created_at = created_at;
      product.updated_at = updated_at;
      product.sold_by_weight = sold_by_weight;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
// // @desc    Create new review
// // @route   POST /api/products/:id/reviews
// // @access  Private
router.route("/:id/reviews").post(
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

module.exports = router;
