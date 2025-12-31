const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./routes/userRoutes.js");
//const Admin = require("./routes/admin.js");
const { verifyToken, isAdmin ,isClient } = require("./middleware/auth");
const Order = require("./routes/order.js")
//const Client = require("./routes/client.js")
const Product = require("./routes/productRoutes.js");


const app = express();

// Middleware
app.use(express.json()); 
app.use(cors({
  origin: process.env.FRONTEND_URL || true,
  credentials:true,
}));
app.use(express.urlencoded({extended:true}));

// API Routes
app.use("/api/users",User);
app.use("/api/products",Product);

app.use("/api/orders", Order);


// Static files
app.use("/uploads", express.static("uploads"));

// Serve static frontend files in production (catch-all for non-API routes)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("Error connecting to DB", err);
    process.exit(1);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});