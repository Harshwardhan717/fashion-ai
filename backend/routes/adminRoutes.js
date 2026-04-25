const router = require("express").Router();
const ctrl = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");
const { upload } = require("../configuration/cloudinary");
const Order = require("../models/Order");

router.post("/login", ctrl.login);
router.get("/products", adminAuth, ctrl.getProducts);
router.post("/products", adminAuth, upload.single("image"), ctrl.addProduct);
router.put("/products/:id", adminAuth, upload.single("image"), ctrl.updateProduct);
router.delete("/products/:id", adminAuth, ctrl.deleteProduct);

router.get("/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/orders/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;