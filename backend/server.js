require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin", require("./routes/adminRoutes"));

// DEBUG (IMPORTANT)
console.log("Connecting to MongoDB...");

// MongoDB Connection
mongoose.connect(
  "mongodb://harshwardhanchougale57_db_user:F8VT0Kg9cA9jAC0g@ac-1zcwths-shard-00-00.dth55z9.mongodb.net:27017,ac-1zcwths-shard-00-01.dth55z9.mongodb.net:27017,ac-1zcwths-shard-00-02.dth55z9.mongodb.net:27017/mydb?ssl=true&replicaSet=atlas-k17zk6-shard-0&authSource=admin&retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("DB Error:", err));

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});