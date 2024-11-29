const router = require("express").Router();

const Order = require("../models/order");
const OrderItem = require("../models/order_item");

const { isAuthenticated } = require("../middleware/authenticated");
const User = require("../models/user");

router.get("/", isAuthenticated, async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("items")
    .populate({
      path: "items",
      populate: {
        path: "food",
        model: "Food",
      },
    });

  res.json(orders);
});

router.post("/", isAuthenticated, async (req, res) => {
  const { items } = req.body;
  console.log(req.body);
  if (!items || !items.length) {
    return res.status(400).send({ message: "Items are required" });
  }
  const user = await User.findOne({ email: req.user.email });
  const orderItems = await OrderItem.insertMany(items);
  const order = new Order({
    user: req.user._id,
    items: orderItems.map((orderItem) => orderItem._id),
  });
  await order.save();
  const result = await Order.findById(order._id).populate("items").populate({
        path: "items",
        populate: {
          path: "food",
          model: "Food",
        },
      });
  console.log(result);
  res.status(201).json(result);
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  const order = await Order.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!order) {
    return res.status(404).send({ message: "Order not found" });
  }
  await OrderItem.deleteMany({ _id: { $in: order.items } });
  res.json(order);
});

module.exports = router;
