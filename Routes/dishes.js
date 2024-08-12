const express = require("express");
const DishesController = require("../Controllers/DishesController");
const DishesRoute = express.Router();

DishesRoute.get("/", DishesController.getData);
DishesRoute.get("/category/:category", DishesController.getDishesByCategory);
DishesRoute.get("/all", DishesController.getAll);
DishesRoute.post("/create_new_dish", DishesController.createNewDish);

module.exports = DishesRoute;
