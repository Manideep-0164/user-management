const { connect } = require("mongoose");
require("dotenv").config();

const connectToMongoDB = connect(process.env.MONGO_URL);

module.exports = { connectToMongoDB };
