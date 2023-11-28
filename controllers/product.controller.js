const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { quantity, description, price, title } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        quantity,
        description,
        price,
        title,
      },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    console.log(queryObj);
    const product = await Product.where("brand").equals(req.query.brand);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addToWishlist = async (req, res) => {
  const { sub } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(sub);
    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === prodId.toString()
    );
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        sub,
        {
          $pull: {
            wishlist: prodId,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        sub,
        {
          $push: {
            wishlist: prodId,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const rateProduct = async (req, res) => {
  const { sub } = req.user;
  const { stars, prodId } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === sub.toString()
    );
    if (alreadyRated) {
      const product = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.stars": stars },
        },
        {
          new: true,
        }
      );
    } else {
      const product = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              stars: stars,
              postedBy: sub,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getAllRatings = await Product.findById(prodId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.stars)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);
    let finalProductRating = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRatings: actualRating,
      },
      {
        new: true,
      }
    );
    res.status(200).json(finalProductRating);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  addToWishlist,
  rateProduct,
};
