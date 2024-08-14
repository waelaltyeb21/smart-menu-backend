const express = require("express");
const DishesController = require("../Controllers/DishesController");
const upload = require("../Middelware/MulterConfig");
const DishesRoute = express.Router();

DishesRoute.get("/", DishesController.getData);
DishesRoute.get("/dish/:id", DishesController.getDish);
DishesRoute.get("/category/:category", DishesController.getDishesByCategory);
DishesRoute.get("/all", DishesController.getAll);
DishesRoute.post("/create_new_dish", upload.single("imageFile"), DishesController.createNewDish);
DishesRoute.delete("/delete_dish/:id", DishesController.deleteDish);
DishesRoute.post("/update_dish", DishesController.updateDish);

module.exports = DishesRoute;
