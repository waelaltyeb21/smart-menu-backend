const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name_en: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});
const CategoryModel = mongoose.model("categories", CategorySchema);
module.exports = CategoryModel;
