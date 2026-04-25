const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const { cloudinary } = require("../configuration/cloudinary");

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, originalPrice, category, collection, description, tag, stock } = req.body;
    const product = await Product.create({
      name,
      price: Number(price),
      originalPrice: Number(originalPrice) || Number(price),
      category,
      collection,
      description,
      tag,
      stock: Number(stock) || 100,
      image: req.file.path,
      cloudinaryId: req.file.filename,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    if (req.file && product.cloudinaryId) {
      await cloudinary.uploader.destroy(product.cloudinaryId);
    }

    const updates = { ...req.body };
    if (req.file) {
      updates.image = req.file.path;
      updates.cloudinaryId = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    if (product.cloudinaryId) {
      await cloudinary.uploader.destroy(product.cloudinaryId);
    }
    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};