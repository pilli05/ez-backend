const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose
      .connect("mongodb://localhost:27017/fileSharing", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB Connected"));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = dbConnection;
