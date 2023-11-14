const { connect } = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.MONGO_URL;

const mongoSetUp = () => {
  return connect(mongoURL);
};

module.exports = { mongoSetUp };
