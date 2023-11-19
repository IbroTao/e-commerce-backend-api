const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
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
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
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
