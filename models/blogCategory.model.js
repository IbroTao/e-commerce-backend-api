const mongoose = require("mongoose");

const blogCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const blogCategory = mongoose.model("BCategory", blogCategorySchema);
module.exports = { blogCategory };
