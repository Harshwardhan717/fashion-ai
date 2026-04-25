const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Get all orders for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
});

// Get a single order
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching order" });
  }
});

// Create a new order
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      items,
      shippingAddress,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod,
      paymentStatus
    } = req.body;

    const hasValidAddress =
      shippingAddress &&
      shippingAddress.firstName &&
      shippingAddress.email &&
      shippingAddress.phone &&
      shippingAddress.address &&
      shippingAddress.city &&
      shippingAddress.pincode;

    if (!userId || !Array.isArray(items) || items.length === 0 || !hasValidAddress) {
      return res.status(400).json({
        success: false,
        message: "Missing required order fields"
      });
    }

    const normalizedItems = items.map((item) => ({
      id: Number(item.id),
      name: item.name,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      image: item.image || ""
    }));

    const calculatedSubtotal = normalizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const normalizedShipping = Number(shipping) || 0;
    const normalizedTax = Number(tax) || 0;
    const calculatedTotal = Number(total) || calculatedSubtotal + normalizedShipping + normalizedTax;

    const orderNumber = "ORD-" + Date.now();

    const order = new Order({
      orderNumber,
      userId: String(userId),
      items: normalizedItems,
      shippingAddress: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName || "",
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        pincode: shippingAddress.pincode
      },
      paymentMethod: paymentMethod || "cod",
      subtotal: calculatedSubtotal,
      shipping: normalizedShipping,
      tax: normalizedTax,
      total: calculatedTotal,
      status: "pending",
      paymentStatus: paymentStatus || (paymentMethod === "card" ? "paid" : "pending")
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
});

// Update order status
router.put("/:orderId", async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status, paymentStatus, updatedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating order" });
  }
});

// Cancel an order
router.post("/:orderId/cancel", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: 'cancelled', updatedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error cancelling order" });
  }
});

module.exports = router;
