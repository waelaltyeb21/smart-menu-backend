const mongoose = require("mongoose");
const DishSchema = new mongoose.Schema({
  name: {
    type: Object,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  active: {
    type: Object,
    required: true,
  },
});

const DishModel = mongoose.model("dishes", DishSchema);
module.exports = DishModel;
