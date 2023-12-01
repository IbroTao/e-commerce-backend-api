const express = require("express");
const server = express();
const { mongoSetUp } = require("./configs/mongoConnect");
const dotenv = require("dotenv").config();
const session = require("express-session");
const port = process.env.PORT || 4000;
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const blogRouter = require("./routes/blog.routes");
const categoryRouter = require("./routes/prodCategory.routes");
const blogCategoryRouter = require("./routes/blogCategory.routes");
const brandRouter = require("./routes/brand.routes");
const couponRouter = require("./routes/coupon.routes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(notFound);
server.use(errorHandler);
server.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
server.use("/api/auth", userRouter);
server.use("/api/product", productRouter);
server.use("/api/blog", blogRouter);
server.use("/api/category", categoryRouter);
server.use("/api/blogCategory", blogCategoryRouter);
server.use("/api/brand", brandRouter);
server.use("/api/coupon", couponRouter);

const runServer = (port) => {
  mongoSetUp()
    .then((res) => {
      server.listen(port);
      console.log(`Server is running on PORT ${port}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
runServer(port);
