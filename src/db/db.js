const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Db connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectDb;
