const connnectDb = require("./src/db/db");
const app = require("./src/routes/app");
require("dotenv").config();

connnectDb();

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
