const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// Get user's wishlist
router.get("/:userId", async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.params.userId });
    if (!wishlist) {
      wishlist = { userId: req.params.userId, items: [] };
    }
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching wishlist" });
  }
});

// Add item to wishlist
router.post("/:userId/add", async (req, res) => {
  try {
    const { item } = req.body;
    
    let wishlist = await Wishlist.findOne({ userId: req.params.userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({
        userId: req.params.userId,
        items: [item]
      });
    } else {
      // Check if item already exists
      const existingItem = wishlist.items.find(i => i.id === item.id);
      if (!existingItem) {
        wishlist.items.push(item);
      }
    }
    
    wishlist.updatedAt = new Date();
    await wishlist.save();
    
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding to wishlist" });
  }
});

// Remove item from wishlist
router.post("/:userId/remove", async (req, res) => {
  try {
    const { itemId } = req.body;
    
    let wishlist = await Wishlist.findOne({ userId: req.params.userId });
    
    if (wishlist) {
      wishlist.items = wishlist.items.filter(i => i.id !== itemId);
      wishlist.updatedAt = new Date();
      await wishlist.save();
    }
    
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing from wishlist" });
  }
});

// Clear wishlist
router.post("/:userId/clear", async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.params.userId });
    
    if (wishlist) {
      wishlist.items = [];
      wishlist.updatedAt = new Date();
      await wishlist.save();
    }
    
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error clearing wishlist" });
  }
});

module.exports = router;
