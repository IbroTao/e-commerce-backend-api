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
    sold: {
      type: Number,
      default: 0,
      select: false,
    },
    color: {
      type: String,
      required: true,
    },
    ratings: [
      {
        stars: Number,
        comment: String,
        postedBy: {
          type: mongoose.SchemaTypes.ObjectId,
        },
      },
    ],
    totalRatings: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", ProductSchema);
module.exports = { Product };
