const express = require("express");
const server = express();
const { mongoSetUp } = require("./configs/mongoConnect");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;
const userRouter = require("./routes/user.routes");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/user", userRouter);

const runServer = (port) => {
  mongoSetUp()
    .then((res) => {
      server.listen(port);
      console.log(`Server is running on ${port}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
runServer(port);
