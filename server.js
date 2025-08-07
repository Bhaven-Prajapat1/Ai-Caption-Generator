require("dotenv").config();
const connectDb = require("./src/db/db");
const app = require("./src/app");


connectDb()
app.listen(3000, () => {
  console.log("Server is running..");
});
