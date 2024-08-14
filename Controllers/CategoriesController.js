const CategoryModel = require("../Models/CategoryModel");

const CategoriesController = {
  // Get All Categories
  getCategories: async (req, res) => {
    const categories = await CategoryModel.find();
    console.log(categories);
    res.status(200).json(categories);
  },
  // Create New Category
  createNewCategory: async (req, res) => {
    const { name_en, name_ar, image, active } = req.body;
    const category = await CategoryModel.find({ name_en: name_en });
    console.log("Category Found ? ", category);
    if (category.length != 0) {
      return res.status(400).json({ msg: "Category Already Exsit" });
    }
    const newCategory = new CategoryModel({ name_en, name_ar, image, active });
    console.log("New Category: ", newCategory);
    newCategory
      .save()
      .then(() =>
        res.status(201).json({ msg: "New Category Has Been Created !" })
      )
      .catch((err) =>
        res.status(500).json({ msg: "Something Went Wrong...", error: err })
      );
  },
};
module.exports = CategoriesController;
