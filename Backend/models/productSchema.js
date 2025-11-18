const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  clientId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: false,
},

  status: {
    type: String,
    enum: ["pending", "placed", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Product",productSchema);
 