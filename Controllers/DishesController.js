const CategoryModel = require("../Models/CategoryModel");
const DishModel = require("../Models/DishModel");

const DishesController = {
  getAll: async (req, res) => {
    const dishes = await DishModel.find();
    const categories = await CategoryModel.find();
    const data = {
      dishes: dishes,
      categories: categories,
    };
    res.status(200).json(data);
  },
  getData: async (req, res) => {
    const dishes = await DishModel.find().populate("category");
    console.log(dishes);
    res.status(200).json(dishes);
  },
  getDishesByCategory: async (req, res) => {
    const { category } = req.params;
    const dishes = await DishModel.find({ category: category });
    const [categories] = await CategoryModel.find({name_en: category});
    console.log(categories);
    const data = {
      dishes: dishes,
      category: categories
    };
    res.status(200).json(data);
  },
  createNewDish: async (req, res) => {
    const { name, price, image, category, active } = req.body;
    const dish = await DishModel.find({ name: name });
    console.log("Dish Found ? ", dish);
    if (dish.length != 0) {
      return res.status(400).json({ msg: "Dish Already Exsit" });
    }
    const newDish = new DishModel({ name, price, image, category, active });
    console.log("New Dish: ", newDish);
    newDish
      .save()
      .then(() => res.status(201).json({ msg: "New Dish Created !" }))
      .catch((err) =>
        res.status(500).json({ msg: "Something Went Wrong...", error: err })
      );
  },
};
module.exports = DishesController;
