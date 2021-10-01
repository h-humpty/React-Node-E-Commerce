const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel.js");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/authMiddleware");

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.route("/myorders").get(
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);
  })
);


// // @desc    Get all orders
// // @route   GET /api/orders
// // @access  Private/Admin
router.route("/").get(
  admin,
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  })
);

router.route("/").post(
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  })
);
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.route("/:id").get(
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

// router.route("/:id/pay").put(
//   protect,
//   asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);

//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.payer.email_address,
//       };

//       const updatedOrder = await order.save();

//       res.json(updatedOrder);
//     } else {
//       res.status(404);
//       throw new Error("Order not found");
//     }
//   })
// );

router.route('/:id/deliver').put(protect, admin, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
)

router.route('/:id/pay').put(protect, admin, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
)




module.exports = router;
