const cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME,
});

const uploadImageToCloud = async (filepath) => {
  const { secure_url } = await cloudinary.v2.uploader.upload(filepath);
  return secure_url;
};

module.exports = { uploadImageToCloud };
