const { Blog } = require("../models/blog.model");

// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(200).json("Blog created");
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  const { title, description, author, category } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      description,
      author,
      category,
    });
    res.status(200).json("Blog updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json("Blog deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET BLOG
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("likes")
      .populate("dislikes");
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    res.status(200).json(blog);
  } catch (err) {
    console.log(err);
  }
};

// GET ALL BLOGS
const getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find().sort({
      createdAt: "desc",
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
};

// LIKE A BLOG
const likeBlog = async (req, res) => {
  const { BlogId } = req.body;
  const blog = await Blog.findById(BlogId);
  const loginUserId = req.user.sub;
  const isLiked = blog.isLiked;
  const disLiked = blog.dislikes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  if (disLiked) {
    const blog = await Blog.findByIdAndUpdate(
      BlogId,
      {
        $pull: {
          dislikes: loginUserId,
        },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.status(200).json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      BlogId,
      {
        $pull: {
          likes: loginUserId,
        },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.status(200).json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      BlogId,
      {
        $push: {
          likes: loginUserId,
        },
        isLiked: true,
      },
      {
        new: true,
      }
    );
    res.status(200).json(blog);
  }
};

const dislikeBlog = async (req, res) => {
  const { BlogId } = req.body;
  const blog = await Blog.findById(BlogId);
  const loginUserId = req.user.sub;
  const isDisliked = blog.isDisliked;
  const isLiked = blog.likes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      BlogId,
      {
        $pull: {
          likes: loginUserId,
        },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    res.status(200).json(blog);
  }
  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      BlogId,
      {
        $pull: {
          dislikes: loginUserId,
        },
        isDisliked: false,
      },
      {
        new: true,
      }
    );
    res.status(200).json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      BlogId,
      {
        $push: {
          dislikes: loginUserId,
        },
        isDisliked: true,
      },
      {
        new: true,
      }
    );
    res.status(200).json(blog);
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getAllBlogs,
  likeBlog,
  dislikeBlog,
};
