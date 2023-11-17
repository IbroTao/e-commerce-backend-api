const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
    quantity: {
      type: Number,
    },
    images: {
      type: Array,
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Lenovo"],
    },
    color: {
      type: String,
      enum: ["Black", "Blue", "Red"],
    },
    ratings: [
      {
        stars: Number,
        postedBy: {
          type: mongoose.SchemaTypes.ObjectId,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", ProductSchema);
module.exports = { Product };
