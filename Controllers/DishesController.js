const { isValidObjectId } = require("mongoose");
const CategoryModel = require("../Models/CategoryModel");
const DishModel = require("../Models/DishModel");

const DishesController = {
  getAll: async (req, res) => {
    const dishes = await DishModel.find().populate("category");
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
  getDish: async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const dish = await DishModel.findById(id);
      console.log("Dish Category: ", dish.category);
      const category = await CategoryModel.findById("66b9df1b8e415bbe9de899f2");
      console.log(category);
      return res.status(200).json({ dish: dish });
    }
    return res.status(400).json({ id: id, msg: "Not Valid ObjectID" });
  },
  getDishesByCategory: async (req, res) => {
    const { category } = req.params;
    const dishes = await DishModel.find({ category: category });
    const [categories] = await CategoryModel.find({ name_en: category });
    console.log(categories);
    const data = {
      dishes: dishes,
      category: categories,
    };
    res.status(200).json(data);
  },
  createNewDish: async (req, res) => {
    const { name, price, image, category, active } = req.body;
    const dish = await DishModel.find({ name: name });
    if (dish.length != 0) {
      return res.status(400).json({ msg: "هذا الصنف موجود بالفعل" });
    }
    const newDish = new DishModel({ name, price, image, category, active });
    console.log("New Dish: ", newDish);
    newDish
      .save()
      .then(() => res.status(201).json({ msg: "تم انشاء صنف جديد !" }))
      .catch((err) =>
        res.status(500).json({ msg: "حدث خطأ ما اثناء انشاء صنف جديد...", error: err })
      );
  },
  updateDish: async (req, res) => {
    const { id, name, price, category, image, active } = req.body;
    if (isValidObjectId(id)) {
      const cate = await CategoryModel.findById(category);
      if (cate) {
        const dish = await DishModel.findByIdAndUpdate(id, {
          name,
          price,
          category: cate.name_en,
          image,
          active,
        });
        return res
          .status(200)
          .json({ dish: dish, msg: "تم تحديث بيانات الصنف" });
      }
    }
    return res.status(400).json({ msg: "Bad ObjectID" });
  },
  deleteDish: async (req, res) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
      const del = await DishModel.findByIdAndDelete(id);
      // If Dish Found
      if (del)
        return res.status(200).json({ id: id, msg: "تم حذف الصنف" });
      // If Dish Not Found
      return res.status(400).json({ id: id, msg: "حدث خطأ اثناء الحذف" });
    }
    // If Not Valid Object ID
    return res.status(400).json({ id: id, msg: "Bad ObjectID" });
  },
};
module.exports = DishesController;
