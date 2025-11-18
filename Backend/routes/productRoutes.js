const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");
const upload = require("../middleware/upload");
const  { protect, adminProtect }= require("../middleware/auth");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
});

// POST create new product (Protected)
router.post("/", protect, adminProtect, upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      image: req.file.filename,
      clientId: req.user._id,
    });

    const savedProduct = await product.save();
    console.log("File received:", req.file);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Upload Error:", error.message);
console.error(error);  

    res.status(400).json({ message: "Error creating product" });
  }
});


// PUT update product
router.put("/:id", protect, adminProtect, upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const updateData = { name, price, description, category };

    if (req.file) updateData.image = req.file.filename;

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE product
router.delete("/:id", protect, adminProtect, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
