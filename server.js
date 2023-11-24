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

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
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
