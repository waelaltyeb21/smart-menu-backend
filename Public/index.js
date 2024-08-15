const express = require("express");
const app = express();
// Configruations
require("dotenv").config();
require("../Config/Connect");
const cors = require("cors");
const mongo = require("mongoose");
// Cors Origin Access
app.use(
  cors({
    origin: [
      "https://smart-menu-admin-dashboard.onrender.com",
      "https://smart-menu-client.onrender.com",
      "https://smart-menu-dashboard-21.web.app",
      "http://localhost:5173",
      "http://localhost:5174"
    ], // Change It Later
    methods: ["GET", "POST", "DELETE", "PUT"], // Change It Later
  })
);
// Pares Json Files
app.use(express.json());
// Allow Access ( Get Method ) To Images On Uploads Folder
app.use("/uploads", express.static("Uploads"));
// Routes
const DishesRoute = require("../Routes/dishes");
const CategoriesRoute = require("../Routes/categories");
// ------------------------------------------------------------------------
app.use("/dishes", DishesRoute);
app.use("/categories", CategoriesRoute);
app.use("*", (req, res) => {
  res.json({ msg: "No Route Found" });
});
// Server & Database
const PORT = process.env.SERVER_PORT;
mongo
  .connect(process.env.DB_MONGO_URI)
  .then(() => {
    console.log("Connected To DB");
    // Server
    app.listen(PORT, () => console.log(`Server Running On PORT ${PORT}`));
  })
  .catch(() => console.log("Something Went Wrong"));
