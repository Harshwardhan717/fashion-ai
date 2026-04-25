// Simple script to seed an admin user to MongoDB
// Run this once to create the demo user

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb://harshwardhanchougale57_db_user:F8VT0Kg9cA9jAC0g@ac-1zcwths-shard-00-00.dth55z9.mongodb.net:27017,ac-1zcwths-shard-00-01.dth55z9.mongodb.net:27017,ac-1zcwths-shard-00-02.dth55z9.mongodb.net:27017/mydb?ssl=true&replicaSet=atlas-k17zk6-shard-0&authSource=admin&retryWrites=true&w=majority"
    );

    console.log("Connected to MongoDB");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user with hashed password
    const hashedPassword = await bcrypt.hash("1234", 10);
    
    const adminUser = new User({
      name: "Admin User",
      email: "admin@gmail.com",
      password: hashedPassword,
      phone: "9876543210",
      address: "123 Main Street",
      city: "Mumbai",
      pincode: "400001"
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully");
    console.log("Email: admin@gmail.com");
    console.log("Password: 1234");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
};

seedAdmin();
