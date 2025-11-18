const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./routes/userRoutes.js");
//const Admin = require("./routes/admin.js");
const { verifyToken, isAdmin ,isClient } = require("./middleware/auth");
const Order = require("./routes/order.js")
//const Client = require("./routes/client.js")
const Product = require("./routes/productRoutes.js");
require("dotenv").config();



const app = express();
app.use(express.json()); 
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));
app.use(express.urlencoded({extended:true}));

app.use("/uploads", express.static("uploads"));

app.use("/api/users",User);
app.use("/api/products",Product);
//app.use("/api/client", verifyToken, isClient, Client);
app.use("/api/orders", Order);
//app.use("/api/admin", verifyToken , isAdmin , Admin);


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to DB", err));



app.listen(5000, () => {
  console.log("Server is running on port 5000");
});