const express = require("express");
const app = express();
// Configruations
require("dotenv").config();
require("../Config/Connect");
const cors = require("cors");

// Cors Origin Access
app.use(
  cors({
    origin: "*", // Change It Later
    methods: "*", // Change It Later
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
// Server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server Running On PORT ${PORT}`));
