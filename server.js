const express = require("express");
const server = express();
const { mongoSetUp } = require("./configs/mongoConnect");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const blogRouter = require("./routes/blog.routes");
const categoryRouter = require("./routes/prodCategory.routes");
const blogCategoryRouter = require("./routes/blogCategory.routes");
const brandRouter = require("./routes/brand.routes");
const couponRouter = require("./routes/coupon.routes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use("/api/auth", userRouter);
server.use("/api/product", productRouter);
server.use("/api/blog", blogRouter);
server.use("/api/category", categoryRouter);
server.use("/api/blogCategory", blogCategoryRouter);
server.use("/api/brand", brandRouter);
server.use("/api/coupon", couponRouter);

server.use(notFound);
server.use(errorHandler);

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
