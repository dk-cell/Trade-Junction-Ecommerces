const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name!"],
  },
  description: {
    type: String,
    required: [true, "Please give descripton to product!"],
  },
  category: {
    type: String,
    required: [true, "Please enter product category!"],
  },
  tags: {
    type: String,
    required: [true, "Please enter product tags!"],
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter discounted price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter quantity of product to add!"],
  },
  images: [
    {
      type: String,
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
