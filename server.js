const connnectDb = require("./src/db/db");
const authRoutes = require("./src/routes/auth.routes");
const app = require("./src/app");
require("dotenv").config();

connnectDb();

app.use("/auth/api", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
