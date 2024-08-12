const express = require("express");
const CategoriesController = require("../Controllers/CategoriesController");
const CategoriesRoute = express.Router();

CategoriesRoute.get("/", CategoriesController.getCategories);
CategoriesRoute.post(
  "/create_new_category",
  CategoriesController.createNewCategory
);

module.exports = CategoriesRoute;
