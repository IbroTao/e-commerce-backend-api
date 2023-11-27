const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("brand", brandSchema);
module.exports = { Brand };
