const mongoose = require("mongoose");
const prodCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("PCategory", prodCategorySchema);
module.exports = { Category };
